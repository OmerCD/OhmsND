import React, {FormEvent, useEffect, useRef, useState} from 'react';
import {DiceD20, DiceD6, DiceManager, DiceObject} from 'threejs-dice'
import THREE, {OrbitControls} from './three';
import * as CANNON from 'cannon'
import DieService, {DieType, RollDiceCommandResponse} from "../../services/DieService";
import {useBaseAxiosApi} from "../../context/axios-context";
import RollResult from "../../components/dice-roll/RollResult";

// @ts-ignore
let container: HTMLDivElement, scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer,
    controls: any, stats,
    world: CANNON.World, dice: DiceObject[] = [];

const dice_mass = {'d4': 300, 'd6': 300, 'd8': 340, 'd10': 350, 'd12': 350, 'd20': 400, 'd100': 350};
const dice_inertia = {'d4': 5, 'd6': 13, 'd8': 10, 'd10': 9, 'd12': 8, 'd20': 6, 'd100': 9};
interface IDieRollInputs {
    dieCount: number;
    dieType: DieType
}

function DiceRollPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [rollResult, setRollResult] = useState<RollDiceCommandResponse[]>([])
    const [inputs, setInputs] = useState<IDieRollInputs>({dieCount: 1, dieType: DieType.D2})
    const baseApi = useBaseAxiosApi();
    const dieService = new DieService(baseApi);
    const roll = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await dieService.rollDice({dice: [{count: inputs.dieCount, dieType: Number(inputs.dieType)}]});
        setRollResult(result);
    }
    let mapped;
    if (rollResult.length > 0) {
        mapped = rollResult.map((value, index) => {
            return <RollResult key={index} rollResults={value}/>
        });
    }
    const handleChange = (event: any) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    }
    let dieTypeOptions = [];
    for (let item in DieType) {
        if (!isNaN(Number(item))) {
            dieTypeOptions.push((
                <option key={item} value={item}>{DieType[item]}</option>
            ))
        }
    }
    useEffect(() => {
        init();

    }, []);
    return (
        <>
            <div ref={containerRef}
                 style={{position: 'absolute', left: '0px', top: '0px', width: '100vw', height: '100vh'}}></div>
            <form onSubmit={roll}>
                <div>
                    <label>Die Count</label>
                    <input type="number" name='dieCount' value={inputs.dieCount} onChange={handleChange}/>
                </div>
                <div>
                    <label>Die Type</label>
                    <select name='dieType' defaultValue={0} onChange={handleChange}>
                        {dieTypeOptions}
                    </select>
                </div>
                <button type={"submit"} className='roll-button'>Roll</button>
            </form>
            <div>
                {mapped}
            </div>
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
        for (var i = 0; i < 5; i++) {
            var die = new DiceD20({size: 1.5, backColor: 'hotpink', fontColor:'whitesmoke'});
            scene.add(die.getObject());
            dice.push(die);
        }

        function randomDiceThrow() {
            var diceValues = [];
            const xAxisModifier = (Math.round(Math.random()) * 2 - 1);
            const yAxisModifier = (Math.round(Math.random()) * 2 - 1);
            for (var i = 0; i < dice.length; i++) {

                let yRand = Math.random() * 10
                dice[i].getObject().position.x = w * .023 * xAxisModifier;
                dice[i].getObject().position.y = 2 + Math.floor(i / 3) * 1.5;
                dice[i].getObject().position.z = h * .023 * yAxisModifier;
                dice[i].getObject().quaternion.x = (Math.random() * 90 - 45) * Math.PI / 180;
                dice[i].getObject().quaternion.z = (Math.random() * 90 - 45) * Math.PI / 180;
                dice[i].updateBodyFromMesh();
                let rand = Math.random() * 20;
                dice[i].getObject().body.velocity.set(rand, rand, rand);
                dice[i].getObject().body.angularVelocity.set(20 * Math.random() - 10, 20 * Math.random() - 10, 20 * Math.random() - 10);

                diceValues.push({dice: dice[i], value: i + 1});
            }

            DiceManager.prepareValues(diceValues);
        }
        // setInterval(randomDiceThrow, 3000);
        randomDiceThrow();
// @ts-ignore
        containerRef.current.addEventListener("click", () => {
            for(let diceIndex in dice){
                scene.remove(dice[diceIndex].getObject());
            }
            dice = [];
        });
        requestAnimationFrame(animate);
    }

    function animate() {
        updatePhysics();
        render();
        requestAnimationFrame(animate);

    }

    function updatePhysics() {
        world.step(1.0 / 60.0);

        for (var i in dice) {
            dice[i].updateMeshFromBody();
        }
    }

    function render() {
        renderer.render(scene, camera);
    }
}

export default DiceRollPage;
