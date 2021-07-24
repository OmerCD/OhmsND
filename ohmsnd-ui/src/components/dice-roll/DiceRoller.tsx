import React, {FormEvent, forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {DiceD10, DiceD12, DiceD20, DiceD4, DiceD6, DiceD8, DiceManager, DiceObject} from 'threejs-dice'
import THREE, {OrbitControls} from './three';
import * as CANNON from 'cannon'
import DieService, {DieType, RollDiceCommandResponse} from "../../services/DieService";
import {useBaseAxiosApi} from "../../context/axios-context";
import RollResult from "../../components/dice-roll/RollResult";

// @ts-ignore
let container: HTMLDivElement, scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer,
    controls: any,
    world: CANNON.World, dieList: DiceObject[] = [];

interface IDieRollInputs {
    dieCount: number;
    dieType: DieType
}

export interface IDiceThrowOptions {
    value: number,
    type: DieType,
}

interface IDiceRollerPropType {
}

export interface DiceRollerRefType{
    rollDice: (options:IDiceThrowOptions[]) => void
}


const DiceRoller = forwardRef((props:IDiceRollerPropType, ref: Ref<DiceRollerRefType>) => {
    const containerRef = useRef<HTMLDivElement>(null)
    let throwDice: (options: IDiceThrowOptions[]) => void;
    useImperativeHandle(ref, () => ({
        rollDice(options: IDiceThrowOptions[]) {
            throwDice(options.map(x => {
                return {value: x.value, type: x.type}
            }));
        }
    }))


    useEffect(() => {
        throwDice = init();
    }, []);
    return (
        <>
            <div ref={containerRef}
                 style={{position: 'absolute', left: '0px', top: '0px', width: '100vw', height: '100vh'}}></div>
        </>
    );

    function init() {
        container = containerRef.current as HTMLDivElement;
        const cw = container.clientWidth / 2;
        const ch = container.clientHeight / 2;

        // SCENE
        scene = new THREE.Scene();
        // CAMERA
        var w = cw,
            h = ch;
        var VIEW_ANGLE = 45,
            ASPECT = w / h,
            NEAR = 0.01,
            FAR = 20000;
        const wh = ch / ASPECT / Math.tan(10 * Math.PI / 180);

        camera = new THREE.PerspectiveCamera(20, cw / ch, 1, wh * 1.3);
        scene.add(camera);

        // camera.position.set(0, 0, wh);
        camera.position.set(0, 90, wh * 0.0001);
        camera.rotation.set(0, 0, 90)
        // camera.position.z = wh;
        // RENDERER
        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setSize(cw * 2, ch * 2);
        renderer.setClearColor(0x000000, 0);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // @ts-ignore
        container.appendChild(renderer.domElement);
        // EVENTS
        // CONTROLS
        // @ts-ignore
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enabled = false;


        let ambient = new THREE.AmbientLight("0xf0f5fb");
        scene.add(ambient);

        // let directionalLight = new THREE.DirectionalLight("#ffffff", 0.5);
        // directionalLight.position.x = -1000;
        // directionalLight.position.y = 1000;
        // directionalLight.position.z = 1000;
        // scene.add(directionalLight);
        var mw = Math.max(w, h);
        let light = new THREE.SpotLight(0xefdfd5, 2.0);
        light.position.set(-mw / 2, mw / 2, mw * 2);
        light.target.position.set(0, 0, 0);
        light.distance = mw * 5;
        light.castShadow = true;
        light.shadow.camera.near = mw / 10;
        light.shadow.camera.far = mw * 5;
        light.shadow.camera.fov = 50;
        light.shadow.bias = 0.001;
        // light.shadowDarkness
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        scene.add(light);
        scene.fog = new THREE.FogExp2(0x9999ff, 0.00025);
        world = new CANNON.World();

        world.gravity.set(0, -9.82 * 10, 0);
        world.broadphase = new CANNON.NaiveBroadphase();
        world.solver.iterations = 16;

        DiceManager.setWorld(world);

        //Floor
        let floorBody = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
            material: DiceManager.floorBodyMaterial
        });
        floorBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(1, 0, 0),
            -Math.PI / 2
        );
        const barrierBody1 = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
            material: DiceManager.barrierBodyMaterial
        })
        const barrierBody2 = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
            material: DiceManager.barrierBodyMaterial
        })
        const barrierBody3 = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
            material: DiceManager.barrierBodyMaterial
        })
        const barrierBody4 = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
            material: DiceManager.barrierBodyMaterial,
        })
        barrierBody1.quaternion.setFromEuler(0, Math.PI, 0);
        barrierBody2.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), Math.PI / 2)
        barrierBody3.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
        barrierBody4.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2)
        barrierBody1.position.set(0, 0, h * 0.025)
        barrierBody2.position.set(0, 0, -h * 0.025)
        barrierBody3.position.set(w * .025, 0, 0)
        barrierBody4.position.set(-w * 0.025, 0, 0)
        // @ts-ignore
        world.addBody(floorBody);
        // @ts-ignore
        world.addBody(barrierBody1);
        // @ts-ignore
        world.addBody(barrierBody2);
        // @ts-ignore
        world.addBody(barrierBody3);
        // @ts-ignore
        world.addBody(barrierBody4);

        //Walls

        var colors = ['#ff0000', '#ffff00', '#00ff00', '#0000ff', '#ff00ff'];

        function randomDiceThrow(dice: IDiceThrowOptions[]) {
            for (let diceIndex in dieList) {
                scene.remove(dieList[diceIndex].getObject());
            }
            dieList = [];
            const diceOptions = {size: 1.5, backColor: 'hotpink', fontColor: 'whitesmoke'};
            for (var i = 0; i < dice.length; i++) {
                let die: DiceObject;
                switch (dice[i].type) {
                    case DieType.D4:
                        die = new DiceD4(diceOptions);
                        break;
                    case DieType.D6:
                        die = new DiceD6(diceOptions);
                        break;
                    case DieType.D8:
                        die = new DiceD8(diceOptions);
                        break;
                    case DieType.D10:
                        die = new DiceD10(diceOptions);
                        break;
                    case DieType.D12:
                        die = new DiceD12(diceOptions);
                        break;
                    case DieType.D20:
                        die = new DiceD20(diceOptions);
                        break;
                    default:
                        die = new DiceD20(diceOptions);

                }
                scene.add(die.getObject());
                dieList.push(die);
            }
            var diceValues = [];
            const xAxisModifier = (Math.round(Math.random()) * 2 - 1);
            const yAxisModifier = (Math.round(Math.random()) * 2 - 1);
            for (var i = 0; i < dice.length; i++) {

                let yRand = Math.random() * 10
                dieList[i].getObject().position.x = w * .023 * xAxisModifier;
                dieList[i].getObject().position.y = 2 + Math.floor(i / 3) * 1.5;
                dieList[i].getObject().position.z = h * .023 * yAxisModifier;
                dieList[i].getObject().quaternion.x = (Math.random() * 90 - 45) * Math.PI / 180;
                dieList[i].getObject().quaternion.z = (Math.random() * 90 - 45) * Math.PI / 180;
                dieList[i].updateBodyFromMesh();
                let rand = Math.random() * 20;
                dieList[i].getObject().body.velocity.set(rand, rand, rand);
                dieList[i].getObject().body.angularVelocity.set(20 * Math.random() - 10, 20 * Math.random() - 10, 20 * Math.random() - 10);

                diceValues.push({dice: dieList[i], value: dice[i].value});
            }

            DiceManager.prepareValues(diceValues);
        }

        // setInterval(randomDiceThrow, 3000);
        // randomDiceThrow();
// @ts-ignore
        containerRef.current.addEventListener("click", () => {
            for (let diceIndex in dieList) {
                scene.remove(dieList[diceIndex].getObject());
            }
            dieList = [];
        });
        requestAnimationFrame(animate);
        return randomDiceThrow;
    }

    function animate() {
        updatePhysics();
        render();
        requestAnimationFrame(animate);

    }

    function updatePhysics() {
        world.step(1.0 / 60.0);

        for (var i in dieList) {
            dieList[i].updateMeshFromBody();
        }
    }

    function render() {
        renderer.render(scene, camera);
    }
});

export default DiceRoller;
