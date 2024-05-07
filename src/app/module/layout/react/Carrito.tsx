import * as React from 'react'
import { useMemo, useRef } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { RandomizedLight, AccumulativeShadows, Environment, useHelper, OrbitControls, useGLTF, Sky } from '@react-three/drei'
import { InstancedRigidBodies, InstancedRigidBodyProps, CylinderCollider, BallCollider, CuboidCollider, RigidBody, Physics } from '@react-three/rapier'
import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MathUtils } from 'three'

// Define una interfaz que describa la estructura del modelo
interface CustomModel extends GLTF {
    nodes: {
      [nodeName: string]: {
        geometry?: THREE.BufferGeometry // Aquí se especifica el tipo de geometría que esperas
      };
    },
    materials: {
        [materialName: string]: THREE.Material;
      };
  }

export default function Carrito(){

    // const shoppingCart = useGLTF('../../../../assets/shopping_cart.glb');  

    const { nodes, materials } = useLoader(GLTFLoader, '../../../../assets/shopping_cart.glb') as CustomModel;
    const obj1 = nodes['Object_4'].geometry;
    const obj2 = nodes['Object_5'].geometry;
    const obj3 = nodes['Object_6'].geometry;


    console.log(nodes)
    console.log(materials)

    const cubesCount = 80;
    // const directionalLight = useRef<THREE.DirectionalLight>(null!);
    // useHelper(directionalLight, THREE.DirectionalLightHelper, 1, "green");
  
    const instances = useMemo(() => {
      const instances: InstancedRigidBodyProps[] = [];

      const rand = MathUtils.randFloatSpread;
  
      for(let i = 0; i < cubesCount; i++)
      {
          instances.push({
              key: 'instance_' + i,
              position: 
              [ 
                  rand(1)+0.05,
                  10 + i,
                  rand(1)+0.05
              ],
              rotation: [ Math.random(), Math.random(), Math.random() ]
          })
      }
  
      return instances;
    }, []);
  
    const getRandomColor = () => {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

    return <>

        <OrbitControls makeDefault/>

        <Environment preset='sunset'/>

        {/* <color args={ ['#252525'] } attach="background"/> */}

        {/* <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } /> */}
        {/* <ambientLight intensity={ 1.5 } /> */}

        <AccumulativeShadows
            temporal
            frames={ 1000 }
            position={ [ 0, -0.99, 0 ] }
            scale={ 10 }
            opacity={ 0.8 }
            //color="#0390fc"
            color="orange"
        >
            <RandomizedLight
                position={ [ 4 ,4 ,1 ] }
                amount={ 8 }
                radius={ 1 }
                ambient={ 0.5 }
                intensity={ 3 }
                bias={ 0.001 }
            />
        </AccumulativeShadows>

        {/* <directionalLight 
            castShadow
            ref={ directionalLight }
            position={ [ 4, 4, 1 ] }
            intensity={ 3 }
            shadow-mapSize={ [ 1024, 1024 ] }
        /> */}


        <Physics
        gravity={ [ 0, - 2.5, 0 ] } 
        debug={ false }
        >

        {/* Carrito */}
        <RigidBody
            type='fixed'
            friction={ 0.7 }
            colliders={ "trimesh" }
        >
            <group scale={ 20 } position-y={ -1 }>
                <mesh
                    castShadow
                    geometry={obj1}
                    material={materials['material']}
                />
                <mesh
                    castShadow
                    geometry={obj2}
                    material={materials['Griff']}
                />
                <mesh
                    castShadow
                    geometry={obj3}
                    material={materials['Chrome']}
                />
            </group>
        </RigidBody>

        <RigidBody
            colliders={ false }
            type='fixed'
        >
            <CuboidCollider args={ [10, 0.5, 10] } position={ [ 0, -1.5, 0 ]}/>
        </RigidBody>
        
        {/* Piso */}
        {/* <RigidBody
            type='fixed'
            friction={ 0.7 }
        >
            <mesh position={ [ 0, 0, 0 ] }>
            <boxGeometry args={ [ 10, 0.5, 10 ] }/>
            <meshStandardMaterial color="greenyellow" />
            </mesh>
        </RigidBody> */}

        {/* <mesh>
            <planeGeometry args={ [ 10, 0.5, 10] }/>
            <meshStandardMaterial  />
        </mesh> */}

        {/* Cubos */}        
        <InstancedRigidBodies instances={ instances }>
            <instancedMesh castShadow args={ [ undefined, undefined, cubesCount ] } count={ cubesCount } >
                    <boxGeometry args={ [ 0.25, 0.25, 0.25] }/>
                    <meshStandardMaterial color="orange"/>
            </instancedMesh>
        </InstancedRigidBodies>

        </Physics>      
    </>
}  