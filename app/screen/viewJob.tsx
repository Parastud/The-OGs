import {
View,
Text,
StyleSheet,
TouchableOpacity,
ScrollView,
Image
} from "react-native";

import {
ArrowLeft,
MapPin,
IndianRupee,
User,
Clock
} from "lucide-react-native";

import { useRouter, useLocalSearchParams } from "expo-router";

export default function ViewJob(){

const router = useRouter();

const { title, price, location } = useLocalSearchParams();

return(

<ScrollView style={styles.container}>

{/* Header */}

<View style={styles.header}>

<TouchableOpacity onPress={()=>router.back()}>
<ArrowLeft size={22}/>
</TouchableOpacity>

<Text style={styles.title}>
Job Details
</Text>

<View style={{width:20}}/>

</View>


{/* Job Card */}

<View style={styles.card}>

<Text style={styles.jobTitle}>
{title || "Kitchen Faucet Replacement"}
</Text>

<View style={styles.row}>

<MapPin size={16} color="#6B7280"/>

<Text style={styles.location}>
{location || "Mathura, UP"}
</Text>

</View>

<View style={styles.row}>

<IndianRupee size={16} color="#6B7280"/>

<Text style={styles.price}>
{price || "₹650"}
</Text>

</View>

<View style={styles.row}>

<Clock size={16} color="#6B7280"/>

<Text style={styles.time}>
Today • Urgent
</Text>

</View>

</View>


{/* Description */}

<View style={styles.section}>

<Text style={styles.sectionTitle}>
Job Description
</Text>

<Text style={styles.description}>
Kitchen faucet is leaking continuously. Need quick replacement.
Bring required tools and parts.
</Text>

</View>


{/* Client */}

<View style={styles.section}>

<Text style={styles.sectionTitle}>
Client Details
</Text>

<View style={styles.clientCard}>

<Image
source={{uri:"https://i.pravatar.cc/150"}}
style={styles.avatar}
/>

<View>

<Text style={styles.clientName}>
Priya Sharma
</Text>

<Text style={styles.clientLocation}>
Mathura, UP
</Text>

</View>

</View>

</View>


{/* Buttons */}

<View style={styles.footer}>

<TouchableOpacity style={styles.rejectBtn}>
<Text style={styles.rejectText}>
Decline
</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.acceptBtn}>
<Text style={styles.acceptText}>
Accept Job
</Text>
</TouchableOpacity>

</View>

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
fontWeight:"600",
marginBottom:10
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

price:{
color:"#4F46E5",
fontWeight:"600"
},

time:{
color:"#6B7280"
},

section:{
paddingHorizontal:20,
marginBottom:20
},

sectionTitle:{
fontSize:16,
fontWeight:"600",
marginBottom:10
},

description:{
color:"#6B7280",
lineHeight:22
},

clientCard:{
backgroundColor:"#fff",
padding:16,
borderRadius:14,
flexDirection:"row",
alignItems:"center",
gap:12
},

avatar:{
width:45,
height:45,
borderRadius:25
},

clientName:{
fontWeight:"600"
},

clientLocation:{
color:"#6B7280"
},

footer:{
flexDirection:"row",
gap:12,
padding:20
},

rejectBtn:{
flex:1,
borderWidth:1,
borderColor:"#E5E7EB",
padding:14,
borderRadius:12,
alignItems:"center"
},

rejectText:{
color:"#6B7280"
},

acceptBtn:{
flex:1,
backgroundColor:"#4F46E5",
padding:14,
borderRadius:12,
alignItems:"center"
},

acceptText:{
color:"#fff",
fontWeight:"600"
}

});