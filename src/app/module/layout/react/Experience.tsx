import * as React from 'react'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Laptop } from './Laptop'
import { Hamburguer } from './Hamburguer'

const Experience = () => {
    return (
        <Canvas
            className='r3f'
            camera={ {
                fov: 45,
                near: 0.1,
                far: 2000,
                position: [ -3, 1.5, 4 ]
            } }
        >
            <Hamburguer/>
        </Canvas>
    )
}

export default Experience;