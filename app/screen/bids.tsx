import React, { useState } from "react";
import {
View,
Text,
StyleSheet,
ScrollView,
TouchableOpacity,
Image
} from "react-native";

import {
Bell,
MapPin,
ShieldCheck,
MessageSquare
} from "lucide-react-native";

export default function BidsScreen() {

const [activeTab, setActiveTab] = useState("accepted");

const pendingData = [
{
id: 1,
title: "Bathroom Pipe Repair",
bid: "₹500",
user: "Rahul Sharma"
}
];

const acceptedData = [
{
id: 2,
title: "Kitchen Faucet Replacement",
bid: "₹650",
user: "Priya Sharma"
},
{
id: 3,
title: "Ceiling Fan Repair",
bid: "₹450",
user: "Arjun K."
}
];

const rejectedData = [
{
id: 4,
title: "AC Installation",
bid: "₹900",
user: "Amit Verma"
}
];

const data =
activeTab === "pending"
? pendingData
: activeTab === "accepted"
? acceptedData
: rejectedData;

const handleChat = (item:any) => {
console.log("Chat:", item.title);
};

const handleViewJob = (item:any) => {
console.log("View Job:", item.title);
};

const handleResumeChat = (item:any) => {
console.log("Resume Chat:", item.title);
};

return (

<View style={styles.container}>

<ScrollView showsVerticalScrollIndicator={false}>

{/* Header */}

<View style={styles.header}>
<Text style={styles.brand}>Gigly</Text>
<Text style={styles.title}>My Bids</Text>
<Bell size={22} color="#111"/>
</View>


{/* Tabs */}

<View style={styles.tabs}>

<TouchableOpacity
style={[styles.tabBtn, activeTab === "pending" && styles.activeTab]}
onPress={() => setActiveTab("pending")}
>
<Text style={[
styles.tabText,
activeTab === "pending" && styles.activeText
]}>
Pending
</Text>
</TouchableOpacity>

<TouchableOpacity
style={[styles.tabBtn, activeTab === "accepted" && styles.activeTab]}
onPress={() => setActiveTab("accepted")}
>
<Text style={[
styles.tabText,
activeTab === "accepted" && styles.activeText
]}>
Accepted
</Text>
</TouchableOpacity>

<TouchableOpacity
style={[styles.tabBtn, activeTab === "rejected" && styles.activeTab]}
onPress={() => setActiveTab("rejected")}
>
<Text style={[
styles.tabText,
activeTab === "rejected" && styles.activeText
]}>
Rejected
</Text>
</TouchableOpacity>

</View>


{/* Section */}

<View style={styles.section}>
<Text style={styles.heading}>Active Opportunities</Text>
<Text style={styles.subtitle}>
Manage your accepted offers and start working.
</Text>
</View>


{/* Cards */}

{data.map((item:any) => (

<View key={item.id} style={styles.card}>

<View style={styles.cardTop}>

<View style={styles.badge}>
<Text style={styles.badgeText}>
{activeTab.toUpperCase()}
</Text>
</View>

<Image
source={{ uri: "https://picsum.photos/100" }}
style={styles.jobImage}
/>

</View>

<Text style={styles.jobTitle}>
{item.title}
</Text>

<Text style={styles.bid}>
Your bid: {item.bid}
</Text>


<View style={styles.clientBox}>

<Image
source={{ uri: "https://i.pravatar.cc/100" }}
style={styles.avatar}
/>

<View style={{flex:1}}>
<Text style={styles.clientName}>
{item.user}
</Text>

<View style={styles.locationRow}>
<MapPin size={14} color="#6B7280"/>
<Text style={styles.location}>
Mathura, UP
</Text>
</View>

</View>

{activeTab === "accepted" && (
<View style={styles.escrow}>
<ShieldCheck size={16} color="#059669"/>
<Text style={styles.escrowText}>
Payment held in escrow
</Text>
</View>
)}

</View>


{/* Buttons */}

{activeTab === "accepted" ? (

<View style={styles.buttons}>

<TouchableOpacity
style={styles.chatBtn}
onPress={() => handleChat(item)}
>
<MessageSquare size={16} color="#4F46E5"/>
<Text style={styles.chatText}>Chat</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.viewBtn}
onPress={() => handleViewJob(item)}
>
<Text style={styles.viewText}>
View Job
</Text>
</TouchableOpacity>

</View>

) : activeTab === "pending" ? (

<TouchableOpacity
onPress={() => handleResumeChat(item)}
>
<Text style={styles.resume}>
Resume Chat
</Text>
</TouchableOpacity>

) : (

<Text style={styles.rejectedText}>
Bid Rejected
</Text>

)}

</View>

))}

</ScrollView>

</View>

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
alignItems:"center",
padding:20
},

brand:{
fontSize:18,
fontWeight:"700",
color:"#4F46E5"
},

title:{
fontSize:18,
fontWeight:"600"
},

tabs:{
flexDirection:"row",
backgroundColor:"#F1F2F6",
marginHorizontal:20,
borderRadius:14,
padding:6
},

tabBtn:{
flex:1,
padding:10,
alignItems:"center",
borderRadius:10
},

tabText:{
color:"#6B7280"
},

activeTab:{
backgroundColor:"#fff"
},

activeText:{
color:"#4F46E5",
fontWeight:"600"
},

section:{
padding:20
},

heading:{
fontSize:24,
fontWeight:"700"
},

subtitle:{
color:"#6B7280",
marginTop:4
},

card:{
backgroundColor:"#fff",
marginHorizontal:20,
padding:18,
borderRadius:20,
marginBottom:20
},

cardTop:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center"
},

badge:{
backgroundColor:"#D1FAE5",
paddingHorizontal:12,
paddingVertical:4,
borderRadius:20
},

badgeText:{
color:"#059669",
fontWeight:"600",
fontSize:12
},

jobImage:{
width:60,
height:60,
borderRadius:12
},

jobTitle:{
fontSize:20,
fontWeight:"700",
marginTop:10
},

bid:{
color:"#6B7280",
marginTop:4
},

clientBox:{
backgroundColor:"#F7F8FC",
padding:12,
borderRadius:14,
marginTop:12,
flexDirection:"row",
alignItems:"center",
gap:10
},

avatar:{
width:40,
height:40,
borderRadius:20
},

clientName:{
fontWeight:"600"
},

locationRow:{
flexDirection:"row",
alignItems:"center"
},

location:{
marginLeft:4,
color:"#6B7280"
},

escrow:{
flexDirection:"row",
alignItems:"center",
gap:4
},

escrowText:{
color:"#059669",
fontSize:12
},

buttons:{
flexDirection:"row",
gap:10,
marginTop:14
},

chatBtn:{
flex:1,
borderWidth:1,
borderColor:"#4F46E5",
padding:12,
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

viewBtn:{
flex:1,
backgroundColor:"#4F46E5",
padding:12,
borderRadius:14,
alignItems:"center"
},

viewText:{
color:"#fff",
fontWeight:"600"
},

resume:{
marginTop:12,
color:"#4F46E5",
fontWeight:"600",
textAlign:"right"
},

rejectedText:{
marginTop:12,
color:"#EF4444",
fontWeight:"600"
}

});