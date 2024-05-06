import * as React from 'react'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Hamburguer } from './Hamburguer'
import { Laptop } from './Laptop'

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