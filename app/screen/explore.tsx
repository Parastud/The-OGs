import {
View,
Text,
StyleSheet,
ScrollView,
TextInput,
TouchableOpacity,
Image
} from "react-native";

import {
Search,
MapPin,
SlidersHorizontal
} from "lucide-react-native";

export default function ExploreScreen() {

const jobs = [
{
id:1,
title:"Leaking Faucet & Sink Repair",
distance:"2.4 km",
price:"₹500 - ₹800",
match:"94%",
image:"https://picsum.photos/200"
},
{
id:2,
title:"Ceiling Fan Installation",
distance:"4.1 km",
price:"₹1,200 - ₹1,500",
match:"89%",
image:"https://picsum.photos/201"
},
{
id:3,
title:"Deep Sofa Cleaning",
distance:"0.8 km",
price:"₹900 - ₹1,100",
match:"82%",
image:"https://picsum.photos/202"
}
];

return (

<View style={styles.container}>

<ScrollView showsVerticalScrollIndicator={false}>

{/* Header */}

<View style={styles.header}>
<Text style={styles.title}>
Explore Jobs
</Text>
</View>


{/* Search */}

<View style={styles.searchContainer}>

<View style={styles.searchBox}>
<Search size={18} color="#9CA3AF"/>
<TextInput
placeholder="Search jobs..."
style={styles.input}
/>
</View>

<TouchableOpacity style={styles.filterBtn}>
<SlidersHorizontal size={18} color="#4F46E5"/>
</TouchableOpacity>

</View>


{/* Categories */}

<View style={styles.categories}>

{["Plumbing","Electrical","Cleaning","AC Repair","Carpentry"]
.map((item)=>(
<TouchableOpacity key={item} style={styles.category}>
<Text style={styles.categoryText}>
{item}
</Text>
</TouchableOpacity>
))}

</View>


{/* Jobs */}

<View style={styles.section}>
<Text style={styles.sectionTitle}>
Recommended for you
</Text>
</View>


{jobs.map((job)=>(
<View key={job.id} style={styles.card}>

<View style={styles.cardTop}>

<Image
source={{uri:job.image}}
style={styles.jobImage}
/>

<View style={{flex:1}}>

<Text style={styles.jobTitle}>
{job.title}
</Text>

<View style={styles.meta}>

<View style={styles.metaRow}>
<MapPin size={14} color="#6B7280"/>
<Text style={styles.metaText}>
{job.distance}
</Text>
</View>

<Text style={styles.metaText}>
{job.price}
</Text>

</View>

</View>

<View style={styles.matchBadge}>
<Text style={styles.matchText}>
{job.match} match
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

</View>

);
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F7F8FC"
},

header:{
padding:20
},

title:{
fontSize:24,
fontWeight:"700"
},

searchContainer:{
flexDirection:"row",
paddingHorizontal:20,
gap:10
},

searchBox:{
flex:1,
flexDirection:"row",
alignItems:"center",
backgroundColor:"#fff",
padding:12,
borderRadius:12,
gap:8
},

input:{
flex:1
},

filterBtn:{
backgroundColor:"#EEF2FF",
padding:12,
borderRadius:12
},

categories:{
flexDirection:"row",
padding:20,
gap:10,
flexWrap:"wrap"
},

category:{
backgroundColor:"#EEF2FF",
paddingHorizontal:14,
paddingVertical:8,
borderRadius:20
},

categoryText:{
color:"#4F46E5",
fontWeight:"500"
},

section:{
paddingHorizontal:20,
marginBottom:10
},

sectionTitle:{
fontSize:18,
fontWeight:"600"
},

card:{
backgroundColor:"#fff",
marginHorizontal:20,
padding:16,
borderRadius:18,
marginBottom:16
},

cardTop:{
flexDirection:"row",
gap:12
},

jobImage:{
width:60,
height:60,
borderRadius:12
},

jobTitle:{
fontWeight:"600",
fontSize:16
},

meta:{
flexDirection:"row",
justifyContent:"space-between",
marginTop:6
},

metaRow:{
flexDirection:"row",
alignItems:"center",
gap:4
},

metaText:{
color:"#6B7280"
},

matchBadge:{
backgroundColor:"#EEF2FF",
paddingHorizontal:10,
paddingVertical:4,
borderRadius:20
},

matchText:{
color:"#4F46E5",
fontSize:12
},

bidBtn:{
borderWidth:1,
borderColor:"#4F46E5",
padding:12,
borderRadius:12,
marginTop:12,
alignItems:"center"
},

bidText:{
color:"#4F46E5",
fontWeight:"600"
}

});