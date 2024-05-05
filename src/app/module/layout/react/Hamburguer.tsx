import React, { useRef } from 'react'
import { Text,  Html, ContactShadows, PresentationControls, useGLTF, OrbitControls, Stage, Environment, Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'

export const Hamburguer = () => {

    const hamburger = useGLTF("../../../../assets/hamburger.glb");
    const hamburgerRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        hamburgerRef.current!.rotation.y += Math.sin(delta * 0.2);
    });
    
    return <>
        <Environment preset='city'/>

        <color args={ ["#E4B03C"] } attach="background" />
        <PresentationControls
            global
            polar={ [ -0.4, 0.2 ] }
            azimuth={ [ - 1, 0.75 ] }
            config={ { mass: 2, tension: 400 } }
            snap={ { mass: 4, tension: 400 } }
        >
            {/* Light */}
            <rectAreaLight 
                width={ 2.0 }
                height={ 5 }
                intensity={ 30 }
                color={ '#ff6900' }
                rotation={ [ 0.1, Math.PI, 0 ] }
                position={ [ 0, 0.55, - 1.15 ] }
            />
            <rectAreaLight 
                width={ 2.0 }
                height={ 5 }
                intensity={ 30 }
                color={ '#8034eb' }
                rotation={ [ 0.1, Math.PI, 0 ] }
                position={ [ 1, 1.5, -0.2] }
            />
            <Float rotationIntensity={ 0.4 }>
                <primitive 
                    ref={ hamburgerRef }
                    object={ hamburger.scene } 
                    position-y={ - 1.2 }
                />
            </Float>
        </PresentationControls>
        
        <ContactShadows 
            position-y={ - 1.4 } 
            opacity={ 0.4 }
            scale={ 5 }
            blur={ 2.4 }
        />
    </>
}
