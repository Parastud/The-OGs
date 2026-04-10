import React,{ createContext,useState,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const GlobalState = createContext();

export const GlobalProvider=({children})=>{
    const[tasks,setTasks]=useState([]);

    useEffect(()=>{
        const loadTasks=async()=>{
            try{
                const savedTasks=await AsyncStorage.getItem('tasks');
                if(savedTasks){
                    setTasks(JSON.parse(savedTasks));
                }
            }catch(error){
                console.log('Error loading tasks:',error);
            }
        };
        loadTasks();
    },[]);

    useEffect(()=>{
        const saveTasks=async()=>{
            try{
                await AsyncStorage.setItem('tasks',JSON.stringify(tasks));
            }catch(error){
                console.log('Error saving tasks:',error);
            }
        };
        saveTasks();
    },[tasks]);
    return(
        <GlobalState.Provider value={{tasks,setTasks}}>
            {children}  
        </GlobalState.Provider>
    );
};



