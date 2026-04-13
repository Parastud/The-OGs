import {
View,
Text,
StyleSheet,
ScrollView,
TouchableOpacity,
Image
} from "react-native";

import {
ArrowLeft,
Bell,
Star,
CalendarCheck,
MessageSquare,
Zap
} from "lucide-react-native";

export default function ProfileScreen() {

return (

<View style={styles.container}>

<ScrollView showsVerticalScrollIndicator={false}>

{/* Header */}

<View style={styles.header}>

<ArrowLeft size={22} color="#111"/>

<Text style={styles.brand}>Gigly</Text>

<View style={styles.headerRight}>
<Text style={styles.location}>Mathura, UP</Text>
<Bell size={20} color="#111"/>
</View>

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

{/* Skills */}

<View style={styles.skills}>

<Text style={styles.skill}>PLUMBING</Text>
<Text style={styles.skill}>ELECTRICAL</Text>
<Text style={styles.skill}>HVAC REPAIR</Text>

</View>

{/* Trust Score */}

<View style={styles.trustCard}>

<View style={styles.circle}>
<Text style={styles.trustNumber}>92</Text>
<Text style={styles.trustLabel}>TRUST SCORE</Text>
</View>

<Text style={styles.verified}>
✨ AI Verified Expert
</Text>

</View>

</View>

{/* Stats */}

<View style={styles.statsRow}>

<View style={styles.statCard}>
<Text style={styles.statNumber}>4.9</Text>
<Star size={16} color="#F59E0B"/>
<Text style={styles.statLabel}>RATING</Text>
</View>

<View style={styles.statCard}>
<Text style={styles.statNumber}>47</Text>
<Text style={styles.statLabel}>REVIEWS</Text>
</View>

<View style={styles.statCard}>
<Text style={styles.statNumber}>18</Text>
<Text style={styles.statLabel}>JOBS</Text>
</View>

</View>

{/* About */}

<View style={styles.section}>

<Text style={styles.sectionTitle}>
ABOUT ME
</Text>

<Text style={styles.aboutText}>
Certified technician with over 8 years of experience in residential infrastructure...
</Text>

</View>

{/* Availability */}

<View style={styles.availableCard}>

<CalendarCheck size={18} color="#059669"/>

<View>
<Text style={styles.availableTitle}>
AVAILABLE TODAY
</Text>

<Text style={styles.availableTime}>
Mon–Sat, 9AM–7PM
</Text>
</View>

</View>

{/* Reviews */}

<View style={styles.sectionHeader}>

<Text style={styles.sectionTitle}>
TOP REVIEWS
</Text>

<Text style={styles.viewAll}>
View All
</Text>

</View>

{/* Review Card */}

{[1,2].map((item)=>(
<View key={item} style={styles.reviewCard}>

<View style={styles.reviewHeader}>

<Image
source={{uri:"https://i.pravatar.cc/100"}}
style={styles.reviewAvatar}
/>

<View style={{flex:1}}>

<Text style={styles.reviewName}>
Priya Verma
</Text>

<Text style={styles.reviewTime}>
2 days ago
</Text>

</View>

<View style={styles.stars}>
<Star size={14} color="#F59E0B"/>
<Star size={14} color="#F59E0B"/>
<Star size={14} color="#F59E0B"/>
<Star size={14} color="#F59E0B"/>
<Star size={14} color="#F59E0B"/>
</View>

</View>

<Text style={styles.reviewText}>
Arjun fixed our kitchen leak in record time...
</Text>

</View>
))}

</ScrollView>

{/* Bottom Buttons */}

<View style={styles.bottomBar}>

<TouchableOpacity style={styles.chatBtn}>
<MessageSquare size={18} color="#4F46E5"/>
<Text style={styles.chatText}>Chat</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.hireBtn}>
<Text style={styles.hireText}>
Hire Now ₹299/hr
</Text>
<Zap size={16} color="#fff"/>
</TouchableOpacity>

</View>

</View>

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
alignItems:"center",
padding:20
},

brand:{
fontSize:18,
fontWeight:"700",
color:"#4F46E5"
},

headerRight:{
flexDirection:"row",
alignItems:"center",
gap:10
},

location:{
color:"#6B7280"
},

profileCard:{
backgroundColor:"#fff",
margin:20,
padding:20,
borderRadius:20,
alignItems:"center"
},

avatar:{
width:80,
height:80,
borderRadius:40
},

name:{
fontSize:22,
fontWeight:"700",
marginTop:10
},

role:{
color:"#6B7280",
marginTop:4
},

skills:{
flexDirection:"row",
gap:8,
marginTop:12,
flexWrap:"wrap",
justifyContent:"center"
},

skill:{
backgroundColor:"#EEF2FF",
padding:6,
paddingHorizontal:12,
borderRadius:20,
color:"#4F46E5",
fontSize:12
},

trustCard:{
alignItems:"center",
marginTop:20
},

circle:{
width:120,
height:120,
borderRadius:60,
borderWidth:6,
borderColor:"#F59E0B",
alignItems:"center",
justifyContent:"center"
},

trustNumber:{
fontSize:24,
fontWeight:"700"
},

trustLabel:{
fontSize:10,
color:"#6B7280"
},

verified:{
marginTop:8,
color:"#F59E0B"
},

statsRow:{
flexDirection:"row",
justifyContent:"space-between",
paddingHorizontal:20
},

statCard:{
backgroundColor:"#fff",
padding:16,
borderRadius:16,
alignItems:"center",
width:"30%"
},

statNumber:{
fontSize:20,
fontWeight:"700"
},

statLabel:{
fontSize:12,
marginTop:4,
color:"#6B7280"
},

section:{
padding:20
},

sectionTitle:{
fontSize:14,
fontWeight:"700",
letterSpacing:1
},

aboutText:{
marginTop:8,
color:"#6B7280",
lineHeight:20
},

availableCard:{
backgroundColor:"#E6F7EF",
margin:20,
padding:16,
borderRadius:16,
flexDirection:"row",
gap:10,
alignItems:"center"
},

availableTitle:{
fontWeight:"600",
color:"#059669"
},

availableTime:{
color:"#065F46"
},

sectionHeader:{
flexDirection:"row",
justifyContent:"space-between",
paddingHorizontal:20
},

viewAll:{
color:"#4F46E5"
},

reviewCard:{
backgroundColor:"#fff",
margin:20,
padding:16,
borderRadius:16
},

reviewHeader:{
flexDirection:"row",
alignItems:"center",
gap:10
},

reviewAvatar:{
width:40,
height:40,
borderRadius:20
},

reviewName:{
fontWeight:"600"
},

reviewTime:{
fontSize:12,
color:"#6B7280"
},

stars:{
flexDirection:"row",
gap:2
},

reviewText:{
marginTop:10,
color:"#6B7280"
},

bottomBar:{
flexDirection:"row",
gap:10,
padding:16,
backgroundColor:"#fff"
},

chatBtn:{
flex:1,
borderWidth:1,
borderColor:"#4F46E5",
padding:14,
borderRadius:14,
flexDirection:"row",
justifyContent:"center",
alignItems:"center",
gap:6
},

chatText:{
color:"#4F46E5",
fontWeight:"600"
},

hireBtn:{
flex:2,
backgroundColor:"#4F46E5",
padding:14,
borderRadius:14,
flexDirection:"row",
justifyContent:"center",
alignItems:"center",
gap:6
},

hireText:{
color:"#fff",
fontWeight:"700"
}

});