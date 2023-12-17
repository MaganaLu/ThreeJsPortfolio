import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { a, animated } from '@react-spring/three'

import eyeScene from '../assets/3d/RedEyeBall.glb'
import { useFrame, useThree } from "@react-three/fiber";

const RedEyeBall = ({ isRotating, setIsRotating, setCurrentStage, currentFocusPoint, ...props }) => {
    const eyeRef = useRef();

    const { gl, viewport } = useThree();
    const { nodes, materials } = useGLTF(eyeScene);

    //Keep track of the mouse position, so we can make the eye move
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    document.onmousemove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        animate();
    }

    function animate() {
        requestAnimationFrame(animate);
        //Here we could add some code to update the scene, adding some automatic movement
      
          //I've played with the constants here until it looked good 
          eyeRef.current.rotation.y = -2 + mouseX / window.innerWidth * 3;
          eyeRef.current.rotation.x = -1 + mouseY * 2.5 / window.innerHeight;
        
        renderer.render(scene, camera);
      }

    return (
        <a.group ref={eyeRef} {...props}>
        <group >
          <group  scale={0.01}>
            <group  scale={100}>
              <mesh
                //castShadow
                //receiveShadow
                geometry={nodes.Eye_Flesh_0.geometry}
                material={materials["Flesh.001"]}
                //position={[0, 0, 0.54]}
              />
              <mesh
                //castShadow
                //receiveShadow
                geometry={nodes.Eyeball.geometry}
                material={materials["material.001"]}
                //position={[0, 0, 0.54]}
                //rotation={[0.007, 0, -Math.PI]}
              />
            </group>
          </group>
        </group>
      </a.group>
      );
}

export default RedEyeBall;


