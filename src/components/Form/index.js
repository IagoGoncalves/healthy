import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, Pressable, Vibration, FlatList } from "react-native"
import ResultImc from "./ResultImc/"
import styles from "./style"

export default function Form(){

    const [height, setHeight] = useState(null)
    const [weight, setweight] = useState(null)
    const [messageImc, setMessageImc] = useState("preencha o peso e altura")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular")
    const [errorMessage, setErrorMessage] = useState(null);
    const [imcList, setImcList] = useState([]);

    function imcCalculator(){
        let heightFormat = height.replace(",", ".")
        let totalImc = (weight / (heightFormat * heightFormat)).toFixed(2);
        setImcList ((arr) => [...arr, {id: new Date().getTime(), imc: totalImc}])
        setImc(totalImc)
    }

    function verificationImc(){
        if(imc == null){
            setErrorMessage("Campo obrigatório*")
            Vibration.vibrate();
        }
    }

    function validationImc(){
        if(weight != null && height != null){
            imcCalculator()
            setHeight(null)
            setweight(null)
            setMessageImc("Seu imc é: ")
            setTextButton("Calcular Novamente")
            setErrorMessage(null)
        }else{
            verificationImc()
            setImc(null)
            setTextButton("Calcular")
            setMessageImc("preencha o peso e altura")
        }
    }

    return (
        <View style={styles.formContext}>
            {imc == null ? 
                <Pressable onPress={Keyboard.dismiss} style={styles.form}>
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
                </Pressable>
            :
                <View style={styles.exibitionResultImc}>
                    <ResultImc messageResultImc={messageImc} resultImc={imc}/>
                    <TouchableOpacity 
                        onPress={()=>{validationImc()}}
                        style={styles.buttonCalculator}
                    >
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
            }
            <FlatList 
            style={styles.listImcs} 
            data={[...imcList].reverse()} 
            renderItem={({item}) => {
                return(
                    <Text style={styles.resultImcItem}>
                        <Text style={styles.textResultItemList}>Resultado IMC = </Text>
                        {item.imc}
                    </Text>
                )
            }}
            keyExtractor={(item) => {
                item.id
            }}
            />
        </View>
    );
}