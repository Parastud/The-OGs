import {
View,
Text,
StyleSheet,
TouchableOpacity,
TextInput,
ScrollView
} from "react-native";

import {
ArrowLeft,
MapPin,
IndianRupee
} from "lucide-react-native";

import { useRouter, useLocalSearchParams } from "expo-router";


export default function PlaceBid(){

const router = useRouter();

const { title, distance, price } = useLocalSearchParams();

return(

<ScrollView style={styles.container}>

<View style={styles.header}>

<TouchableOpacity
onPress={()=>router.back()}
>
<ArrowLeft size={22}/>
</TouchableOpacity>

<Text style={styles.title}>
Place Bid
</Text>

<View style={{width:20}}/>

</View>


<View style={styles.card}>

<Text style={styles.jobTitle}>
{title}
</Text>

<View style={styles.row}>

<MapPin size={16} color="#6B7280"/>

<Text style={styles.location}>
{distance}
</Text>

</View>

<Text style={styles.priceRange}>
Budget: {price}
</Text>

</View>


<View style={styles.section}>

<Text style={styles.label}>
Your Bid Amount
</Text>

<View style={styles.inputBox}>

<IndianRupee size={18}/>

<TextInput
placeholder="Enter amount"
keyboardType="numeric"
style={styles.input}
placeholderTextColor="#9CA3AF"
/>

</View>

</View>


<View style={styles.section}>

<Text style={styles.label}>
Message to Client
</Text>

<TextInput
placeholder="Explain your work..."
multiline
style={styles.textArea}
placeholderTextColor="#9CA3AF"
/>

</View>


<TouchableOpacity style={styles.button}>
<Text style={styles.buttonText}>
Submit Bid
</Text>
</TouchableOpacity>

</ScrollView>

)

}


const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F7F8FC"
},

header:{
flexDirection:"row",
justifyContent:"space-between",
padding:20,
alignItems:"center"
},

title:{
fontSize:18,
fontWeight:"600"
},

card:{
backgroundColor:"#fff",
margin:20,
padding:20,
borderRadius:16
},

jobTitle:{
fontSize:18,
fontWeight:"600"
},

row:{
flexDirection:"row",
alignItems:"center",
gap:6,
marginTop:6
},

location:{
color:"#6B7280"
},

priceRange:{
marginTop:10,
color:"#4F46E5",
fontWeight:"500"
},

section:{
paddingHorizontal:20,
marginBottom:20
},

label:{
fontSize:14,
fontWeight:"600",
marginBottom:8
},

inputBox:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#fff",
padding:14,
borderRadius:12,
gap:6
},

input:{
flex:1,
fontSize:16,
color:"#000"
},

textArea:{
backgroundColor:"#fff",
padding:14,
borderRadius:12,
height:120,
textAlignVertical:"top",
color:"#000"
},

button:{
backgroundColor:"#4F46E5",
margin:20,
padding:16,
borderRadius:14,
alignItems:"center"
},

buttonText:{
color:"#fff",
fontWeight:"600",
fontSize:16
}

});