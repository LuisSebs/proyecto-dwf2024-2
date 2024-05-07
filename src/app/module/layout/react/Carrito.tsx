import * as React from 'react'
import { useMemo, useRef } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { RandomizedLight, AccumulativeShadows, Environment, useHelper, OrbitControls, useGLTF, Sky } from '@react-three/drei'
import { InstancedRigidBodies, InstancedRigidBodyProps, CylinderCollider, BallCollider, CuboidCollider, RigidBody, Physics } from '@react-three/rapier'
import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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

    const cubesCount = 20;
    const directionalLight = useRef<THREE.DirectionalLight>(null!);
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1, "green");
  
    const instances = useMemo(() => {
      const instances: InstancedRigidBodyProps[] = [];
  
      for(let i = 0; i < cubesCount; i++)
      {
          instances.push({
              key: 'instance_' + i,
              position: 
              [ 
                  (Math.random() - 0.5) * 2,
                  6 + i * 0.2,
                  (Math.random() -0.5) * 8
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

        {/* <AccumulativeShadows
            position={ [ 0, -99, 0 ] }
            scale={ 10 }
        >
            <RandomizedLight
                position={ [ 4 ,4 ,0 ] }
            />
        </AccumulativeShadows> */}

        <directionalLight 
        castShadow
        ref={ directionalLight }
        position={ [ 4, 4, 1] }
        intensity={ 3 }
        />


        <Physics
        gravity={ [ 0, - 9.08, 0 ] } 
        debug={ false }
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


        {/* Carrito */}
        <RigidBody
            type='fixed'
            friction={ 0.7 }
            colliders={ "trimesh" }
        >
            {/* <primitive castShadow object={ shoppingCart.scene } position={ [ 0, -1, 0 ] } scale={ 4 }/> */}
            
            {/* <mesh castShadow position={ [ 2, 0, 0] } scale={ 1.5 }>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple"/>
            </mesh> */}
        </RigidBody>

        <mesh receiveShadow position={ [ 0, -1, 0 ]} rotation-x={ - Math.PI * 0.5} scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>
        
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
        {
        /*
        <InstancedRigidBodies instances={ instances }>
            <instancedMesh castShadow args={ [ undefined, undefined, cubesCount ] } count={ cubesCount } >
                    <boxGeometry args={ [ 0.5, 0.5, 0.5] }/>
                    <meshNormalMaterial />
            </instancedMesh>
        </InstancedRigidBodies>
        */
        }
        </Physics>      
    </>
}  