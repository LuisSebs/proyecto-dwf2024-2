import * as React from 'react'
import { useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { RandomizedLight, AccumulativeShadows, Environment, OrbitControls} from '@react-three/drei'
import { InstancedRigidBodies, InstancedRigidBodyProps, CuboidCollider, RigidBody, Physics } from '@react-three/rapier'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MathUtils } from 'three'
import * as THREE from 'three'

const carrito = '../../../../assets/shopping_cart.glb';

// Interfaz para poder acceder a nodes y materials
interface CustomModel extends GLTF {
    nodes: {
      [nodeName: string]: {
        geometry?: THREE.BufferGeometry
      };
    },
    materials: {
        [materialName: string]: THREE.Material;
      };
}

export default function Carrito(){ 

    const { nodes, materials } = useLoader(GLTFLoader, carrito) as CustomModel;
    const obj1 = nodes['Object_4'].geometry; // Ruedas
    const obj2 = nodes['Object_5'].geometry; // Manublio
    const obj3 = nodes['Object_6'].geometry; // Reja

    // Cantidad de cubos
    const cubesCount = 80;
    
    // Para generar los cubos una sola vez (cache)
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
  
    return <>

        <OrbitControls 
            makeDefault
            enablePan={ false }
            enableZoom={ false }
            minPolarAngle={ Math.PI / 4 }
            maxPolarAngle={ Math.PI / 2 }
        />

        <Environment preset='sunset'/>

        <color args={ ['ivory'] } attach="background"/>

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
            <group scale={ 20 } position-y={ -1 } dispose={null}>
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

        {/* Piso Collider */}
        <RigidBody
            colliders={ false }
            type='fixed'
        >
            <CuboidCollider args={ [10, 0.5, 10] } position={ [ 0, -1.5, 0 ]}/>
        </RigidBody>
        
        {/* Cubos */}        
        <InstancedRigidBodies instances={ instances }>
            <instancedMesh castShadow args={ [ undefined, undefined, cubesCount ] } count={ cubesCount } >
                    <boxGeometry args={ [ 0.25, 0.25, 0.25] }/>
                    <meshStandardMaterial color="#b0916e"/>
            </instancedMesh>
        </InstancedRigidBodies>

        </Physics>

    </>
}  

useLoader.preload(GLTFLoader,carrito);