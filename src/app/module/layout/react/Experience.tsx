import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import Carrito from './Carrito';
import { Suspense } from 'react';

const Experience = () => {
    return (
        <Canvas
            shadows
            className='r3f'
            camera={ {
                fov: 42,
                near: 0.1,
                far: 2000,
                position: [ -4.03, 3.7, 6.16 ]
            } }
        > 
            <Suspense>
                <Carrito />
            </Suspense>
        </Canvas>
    )
}

export default Experience;