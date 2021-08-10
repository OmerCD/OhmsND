import React, {
    CSSProperties,
    FormEvent,
    forwardRef,
    Ref,
    useEffect,
    useImperativeHandle, useMemo,
    useRef,
    useState
} from 'react';
import {DiceD10, DiceD12, DiceD20, DiceD4, DiceD6, DiceD8, DiceManager, DiceObject} from 'threejs-dice'
import THREE, {OrbitControls} from './three';
import * as CANNON from 'cannon'
import {DieType} from "../../services/DieService";
import './DiceRoller.css'
// @ts-ignore
let container: HTMLDivElement, scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer,
    controls: any,
    world: CANNON.World, dieList: DiceObject[] = [], ambient: THREE.AmbientLight, light: THREE.SpotLight,
    barrierBody1: CANNON.Body, barrierBody2: CANNON.Body, barrierBody3: CANNON.Body, barrierBody4: CANNON.Body,
    floorBody: CANNON.Body, w: number, h: number, frameId: number, animationStarted: boolean;

interface IDieRollInputs {
    dieCount: number;
    dieType: DieType
}

export interface IDiceThrowOptions {
    value: number,
    type: DieType,
}

interface IDiceRollerPropType {
    className?: string,
    style?: CSSProperties
}

export interface DiceRollerRefType {
    rollDice: (options: IDiceThrowOptions[]) => void
}


const DiceRoller = forwardRef((props: IDiceRollerPropType, ref: Ref<DiceRollerRefType>) => {
    const containerRef = useRef<HTMLDivElement>(null)
    let throwDice: (options: IDiceThrowOptions[]) => void;
    const [diceIndex, setDiceIndex] = useState<number>(-15);
    useImperativeHandle(ref, () => ({
        rollDice(options: IDiceThrowOptions[]) {
            throwDice(options.map(x => {
                return {value: x.value, type: x.type}
            }));
            setDiceIndex(1);
            setTimeout(() => {
                setDiceIndex(-5);
            }, 2000)
        }
    }))


    useEffect(() => {
        setup();
    }, []);
    useMemo(() => {
        throwDice = init
    }, [diceIndex])
    const style = {...props.style, '--diceIndex': diceIndex} as React.CSSProperties;
    return (
        <>
            <div ref={containerRef}
                 className={`dice-table ${props.className ? props.className : ''}`}
                 style={style}
            ></div>
        </>
    );

    function setup() {
        animationStarted = false;
        container = containerRef.current as HTMLDivElement;
        const cw = container.clientWidth / 2;
        const ch = container.clientHeight / 2;

        w = cw;
        h = ch;
        var VIEW_ANGLE = 45,
            ASPECT = w / h,
            NEAR = 0.01,
            FAR = 20000;
        const wh = ch / ASPECT / Math.tan(10 * Math.PI / 180);

        camera = new THREE.PerspectiveCamera(20, cw / ch, 1, wh * 1.3);

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
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enabled = false;


        ambient = new THREE.AmbientLight("0xf0f5fb");
        var mw = Math.max(w, h);
        light = new THREE.SpotLight(0xefdfd5, 2.0);
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


        floorBody = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
            material: DiceManager.floorBodyMaterial
        });
        floorBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(1, 0, 0),
            -Math.PI / 2
        );
        barrierBody1 = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
            material: DiceManager.barrierBodyMaterial
        })
        barrierBody2 = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
            material: DiceManager.barrierBodyMaterial
        })
        barrierBody3 = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
            material: DiceManager.barrierBodyMaterial
        })
        barrierBody4 = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
            material: DiceManager.barrierBodyMaterial,
        })
        const barrierModifier = 0.023;
        barrierBody1.quaternion.setFromEuler(0, Math.PI, 0);
        barrierBody2.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), Math.PI / 2)
        barrierBody3.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
        barrierBody4.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2)
        barrierBody1.position.set(0, 0, h * barrierModifier)
        barrierBody2.position.set(0, 0, -h * barrierModifier)
        barrierBody3.position.set(w * barrierModifier, 0, 0)
        barrierBody4.position.set(-w * barrierModifier, 0, 0)

    }

    function init(dice: IDiceThrowOptions[]) {
        container.innerHTML = '';
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x9999ff, 0.00025);
        world = new CANNON.World();
        world.gravity.set(0, -9.82 * 10, 0);
        world.broadphase = new CANNON.NaiveBroadphase();
        world.solver.iterations = 16;
        scene.add(camera);
        DiceManager.setWorld(world);

        world.addBody(floorBody);
        world.addBody(barrierBody1);
        world.addBody(barrierBody2);
        world.addBody(barrierBody3);
        world.addBody(barrierBody4);

        container.appendChild(renderer.domElement);
        scene.add(ambient);
        scene.add(light);


        function randomDiceThrow(dice: IDiceThrowOptions[]) {
            clearDice();
            const diceOptions = {size: 1.5, backColor: '#424242', fontColor: 'whitesmoke'};
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
                dieList[i].getObject().position.x = w * .015 * xAxisModifier;
                dieList[i].getObject().position.y = 2 + Math.floor(i / 3) * 1.5;
                dieList[i].getObject().position.z = h * .015 * yAxisModifier;
                dieList[i].getObject().quaternion.x = (Math.random() * 90 - 45) * Math.PI / 180;
                dieList[i].getObject().quaternion.z = (Math.random() * 90 - 45) * Math.PI / 180;
                dieList[i].updateBodyFromMesh();
                let rand = Math.random() * 40;
                dieList[i].getObject().body.velocity.set(rand, rand, rand);
                dieList[i].getObject().body.angularVelocity.set(20 * Math.random() - 10, 20 * Math.random() - 10, 20 * Math.random() - 10);

                diceValues.push({dice: dieList[i], value: dice[i].value});
            }

            DiceManager.prepareValues(diceValues);
        }

        function clearDice() {
            for (let diceIndex in dieList) {
                const object = dieList[diceIndex].getObject()
                if (object) {
                    if (object.geometry)
                        object.geometry.dispose();
                    // @ts-ignore
                    if (object.material && object.material.materials) {
                        // @ts-ignore
                        for (let index = 0; index < object.material.materials.length; index++) {
                            // @ts-ignore
                            object.material.materials[index].dispose()
                            console.log("disposed material");
                        }
                    }

                    scene.remove(object);
                }
            }
            renderer.renderLists.dispose();
            dieList = [];
            setDiceIndex(-15);
        }

        document.body.addEventListener("click", handleBodyClick);

        function handleBodyClick() {
            clearDice();
            document.body.removeEventListener("click", handleBodyClick);
        }


        // // @ts-ignore
        // containerRef.current.addEventListener("click", () => {
        //     clearDice();
        // });
        randomDiceThrow(dice)
        if (!animationStarted) {
            requestAnimationFrame(animate);
            animationStarted = true;
        }
    }

    function animate() {
        updatePhysics();
        render();
        controls.update();
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
