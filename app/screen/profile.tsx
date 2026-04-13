import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import {
    Briefcase,
    Settings,
    Star,
    Wallet
} from "lucide-react-native";

import { useRouter } from "expo-router";

export default function ProfileScreen() {

const router = useRouter();

return (

<ScrollView style={styles.container}>

{/* Header */}

<View style={styles.header}>

<Text style={styles.brand}>
Gigly
</Text>

<TouchableOpacity
onPress={()=>router.push("/screen/settings")}
>
<Settings size={22} color="#111"/>
</TouchableOpacity>

</View>


{/* Profile Card */}

<View style={styles.profileCard}>

<Image
source={{uri:"https://i.pravatar.cc/150"}}
style={styles.avatar}
/>

<Text style={styles.name}>
Arjun Sharma
</Text>

<Text style={styles.role}>
Plumber & Electrician
</Text>

<View style={styles.badges}>

<Text style={styles.badge}>
Plumbing
</Text>

<Text style={styles.badge}>
Electrical
</Text>

<Text style={styles.badge}>
HVAC Repair
</Text>

</View>

</View>


{/* Stats */}

<View style={styles.statsRow}>

<View style={styles.statBox}>
<Star size={18} color="#F59E0B"/>
<Text style={styles.statNumber}>4.9</Text>
<Text style={styles.statLabel}>Rating</Text>
</View>

<View style={styles.statBox}>
<Briefcase size={18} color="#4F46E5"/>
<Text style={styles.statNumber}>47</Text>
<Text style={styles.statLabel}>Reviews</Text>
</View>

<View style={styles.statBox}>
<Wallet size={18} color="#16A34A"/>
<Text style={styles.statNumber}>18</Text>
<Text style={styles.statLabel}>Jobs</Text>
</View>

</View>


{/* About */}

<View style={styles.section}>

<Text style={styles.sectionTitle}>
About Me
</Text>

<Text style={styles.about}>
Certified technician with over 8 years of experience in residential infrastructure. I specialize in plumbing and electrical installations.
</Text>

</View>

</ScrollView>

);
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

brand:{
fontSize:20,
fontWeight:"700",
color:"#4F46E5"
},

profileCard:{
backgroundColor:"#fff",
margin:20,
borderRadius:20,
padding:20,
alignItems:"center"
},

avatar:{
width:90,
height:90,
borderRadius:50,
marginBottom:10
},

name:{
fontSize:20,
fontWeight:"600"
},

role:{
color:"#6B7280",
marginTop:4
},

badges:{
flexDirection:"row",
gap:8,
marginTop:12,
flexWrap:"wrap"
},

badge:{
backgroundColor:"#EEF2FF",
paddingHorizontal:10,
paddingVertical:6,
borderRadius:12,
color:"#4F46E5",
fontSize:12
},

statsRow:{
flexDirection:"row",
justifyContent:"space-between",
paddingHorizontal:20
},

statBox:{
backgroundColor:"#fff",
padding:16,
borderRadius:16,
alignItems:"center",
width:"30%"
},

statNumber:{
fontSize:18,
fontWeight:"600",
marginTop:6
},

statLabel:{
fontSize:12,
color:"#6B7280"
},

section:{
padding:20
},

sectionTitle:{
fontSize:16,
fontWeight:"600",
marginBottom:8
},

about:{
color:"#6B7280",
lineHeight:22
}

});