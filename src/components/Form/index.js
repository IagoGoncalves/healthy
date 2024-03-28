import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, Vibration } from "react-native"
import ResultImc from "./ResultImc/"
import styles from "./style"

export default function Form(){

    const [height, setHeight] = useState(null)
    const [weight, setweight] = useState(null)
    const [messageImc, setMessageImc] = useState("preencha o peso e altura")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular")
    const [errorMessage, setErrorMessage] = useState(null);

    function imcCalculator(){
        return setImc((
            (weight.replace(",", ".") * 1) /
            (height.replace(",", ".") * 1 * (height.replace(",", ".") * 1))).toFixed(2)
        )
    }

    function verificationImc(){
        if(imc == null){
            setErrorMessage("Campo obrigatório*")
            Vibration.vibrate();
        }
    }

    function validationImc(){
        Keyboard.dismiss();
        if(weight != null && height != null){
            imcCalculator()
            setHeight(null)
            setweight(null)
            setMessageImc("Seu imc é: ")
            setTextButton("Calcular Novamente")
            setErrorMessage(null)
            return
        }
        verificationImc()
        setImc(null)
        setTextButton("Calcular")
        setMessageImc("preencha o peso e altura")
    }

    return (
        <View style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                    onChangeText={setHeight}
                    value={height}
                    placeholder="Ex. 1.75"
                    keyboardType="numeric"
                    style={styles.input}
                />

                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                    onChangeText={setweight}
                    value={weight}
                    placeholder="Ex. 75.35"
                    keyboardType="numeric"
                    style={styles.input}
                />
               <TouchableOpacity 
                    onPress={()=>{validationImc()}}
                    style={styles.buttonCalculator}
                >
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
               </TouchableOpacity>
            </View>
            <ResultImc messageResultImc={messageImc} resultImc={imc}/>
        </View>
    );
}