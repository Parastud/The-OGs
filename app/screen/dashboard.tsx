import {
View,
Text,
StyleSheet,
ScrollView,
TouchableOpacity,
Image
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
Bell,
MapPin,
TrendingUp,
CheckCircle2,
Clock,
Star
} from "lucide-react-native";

export default function HomeScreen() {

return (

<SafeAreaView style={styles.container}>

<ScrollView showsVerticalScrollIndicator={false}>

{/* Header */}
<View style={styles.header}>

<View>

<Text style={styles.brand}>
Gigly
</Text>

<View style={styles.locationRow}>
<MapPin size={14} color="#6B7280"/>
<Text style={styles.location}>
Mathura, UP
</Text>
</View>

</View>

<View style={styles.headerRight}>
<Bell size={22} color="#111"/>

<Image
source={{ uri: "https://i.pravatar.cc/100" }}
style={styles.avatar}
/>

</View>

</View>

{/* Greeting */}

<View style={styles.greeting}>

<Text style={styles.greetingTitle}>
Good morning, Rahul 👋
</Text>

<Text style={styles.subtitle}>
You have <Text style={styles.highlight}>3 new job matches</Text>
</Text>

</View>

{/* Stats */}

<View style={styles.cardRow}>

<View style={styles.card}>

<Text style={styles.cardLabel}>
TOTAL EARNED
</Text>

<Text style={styles.cardValuePurple}>
₹12,400
</Text>

</View>

<View style={styles.card}>

<Text style={styles.cardLabel}>
JOBS DONE
</Text>

<Text style={styles.cardValueGreen}>
34
</Text>

</View>

</View>

<View style={styles.cardRow}>

<View style={styles.card}>

<Text style={styles.cardLabel}>
COMPLETION RATE
</Text>

<Text style={styles.cardValueGreen}>
97%
</Text>

</View>

<View style={styles.card}>

<Text style={styles.cardLabel}>
ACTIVE GIGS
</Text>

<Text style={styles.cardValueOrange}>
03
</Text>

</View>

</View>

{/* Trust Score */}

<View style={styles.trustCard}>

<View style={styles.trustHeader}>

<Star size={18} color="#F59E0B"/>

<Text style={styles.trustTitle}>
Trust Score
</Text>

<Text style={styles.trustScore}>
92/100
</Text>

</View>

<View style={styles.progressBar}>
<View style={styles.progress}/>
</View>

<View style={styles.badges}>

<View style={styles.badge}>
<Clock size={14} color="#059669"/>
<Text style={styles.badgeText}>On Time</Text>
</View>

<View style={styles.badge}>
<CheckCircle2 size={14} color="#059669"/>
<Text style={styles.badgeText}>Verified</Text>
</View>

</View>

</View>

{/* Jobs */}

<View style={styles.sectionHeader}>

<Text style={styles.sectionTitle}>
Matched jobs for you
</Text>

<Text style={styles.viewAll}>
View all
</Text>

</View>

{[1,2,3].map((item)=>(
<View key={item} style={styles.jobCard}>

<View style={styles.jobTop}>

<Image
source={{ uri: "https://picsum.photos/200" }}
style={styles.jobImage}
/>

<View style={{flex:1}}>

<Text style={styles.jobTitle}>
Leaking Faucet & Sink Repair
</Text>

<Text style={styles.jobMeta}>
2.4 km · ₹500 - ₹800
</Text>

</View>

</View>

<TouchableOpacity style={styles.bidBtn}>
<Text style={styles.bidText}>
Place Bid
</Text>
</TouchableOpacity>

</View>
))}

</ScrollView>

</SafeAreaView>

);
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F6F7FB"
},

header:{
flexDirection:"row",
justifyContent:"space-between",
padding:20
},

brand:{
fontSize:20,
fontWeight:"700",
color:"#4F46E5"
},

locationRow:{
flexDirection:"row",
alignItems:"center",
marginTop:4
},

location:{
marginLeft:4,
color:"#6B7280"
},

headerRight:{
flexDirection:"row",
alignItems:"center",
gap:14
},

avatar:{
width:36,
height:36,
borderRadius:18
},

greeting:{
paddingHorizontal:20
},

greetingTitle:{
fontSize:24,
fontWeight:"700",
color:"#111"
},

subtitle:{
marginTop:5,
color:"#6B7280"
},

highlight:{
color:"#4F46E5",
fontWeight:"600"
},

cardRow:{
flexDirection:"row",
justifyContent:"space-between",
paddingHorizontal:20,
marginTop:16
},

card:{
backgroundColor:"#fff",
padding:16,
borderRadius:16,
width:"48%"
},

cardLabel:{
fontSize:12,
color:"#6B7280"
},

cardValuePurple:{
fontSize:22,
fontWeight:"700",
marginTop:6,
color:"#4F46E5"
},

cardValueGreen:{
fontSize:22,
fontWeight:"700",
marginTop:6,
color:"#059669"
},

cardValueOrange:{
fontSize:22,
fontWeight:"700",
marginTop:6,
color:"#D97706"
},

trustCard:{
backgroundColor:"#fff",
margin:20,
padding:16,
borderRadius:16
},

trustHeader:{
flexDirection:"row",
alignItems:"center",
gap:6
},

trustTitle:{
fontSize:16,
fontWeight:"600",
flex:1
},

trustScore:{
fontSize:16,
fontWeight:"700"
},

progressBar:{
height:8,
backgroundColor:"#E5E7EB",
borderRadius:10,
marginTop:10
},

progress:{
height:8,
width:"92%",
backgroundColor:"#F59E0B",
borderRadius:10
},

badges:{
flexDirection:"row",
gap:10,
marginTop:12
},

badge:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#ECFDF5",
padding:6,
paddingHorizontal:10,
borderRadius:20,
gap:6
},

badgeText:{
fontSize:12,
color:"#059669"
},

sectionHeader:{
flexDirection:"row",
justifyContent:"space-between",
paddingHorizontal:20,
marginBottom:10
},

sectionTitle:{
fontSize:18,
fontWeight:"600"
},

viewAll:{
color:"#4F46E5"
},

jobCard:{
backgroundColor:"#fff",
marginHorizontal:20,
marginBottom:16,
padding:15,
borderRadius:16
},

jobTop:{
flexDirection:"row",
gap:12
},

jobImage:{
width:50,
height:50,
borderRadius:12
},

jobTitle:{
fontWeight:"600"
},

jobMeta:{
marginTop:4,
color:"#6B7280"
},

bidBtn:{
marginTop:12,
borderWidth:1,
borderColor:"#4F46E5",
padding:10,
borderRadius:10,
alignItems:"center"
},

bidText:{
color:"#4F46E5",
fontWeight:"600"
}

});