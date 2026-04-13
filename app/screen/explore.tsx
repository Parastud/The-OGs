import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import {
    MapPin,
    Search,
    SlidersHorizontal
} from "lucide-react-native";

import { useRouter } from "expo-router";


export default function Explore(){

const router = useRouter();

return(

<ScrollView style={styles.container}>

<Text style={styles.title}>
Explore Jobs
</Text>


{/* Search */}

<View style={styles.searchRow}>

<View style={styles.searchBox}>

<Search size={18} color="#9CA3AF"/>

<TextInput
placeholder="Search jobs..."
placeholderTextColor="#9CA3AF"
style={styles.searchInput}
/>

</View>

<TouchableOpacity style={styles.filterBtn}>
<SlidersHorizontal size={18} color="#4F46E5"/>
</TouchableOpacity>

</View>


{/* Categories */}

<View style={styles.categoryRow}>

<Category label="Plumbing"/>
<Category label="Electrical"/>
<Category label="Cleaning"/>
<Category label="AC Repair"/>
<Category label="Carpentry"/>

</View>


<Text style={styles.section}>
Recommended for you
</Text>


<JobCard
title="Leaking Faucet & Sink Repair"
distance="2.4 km"
price="₹500 - ₹800"
match="94%"
image="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
/>

<JobCard
title="Ceiling Fan Installation"
distance="4.1 km"
price="₹1,200 - ₹1,500"
match="89%"
image="https://images.unsplash.com/photo-1503387762-592deb58ef4e"
/>

<JobCard
title="Deep Sofa Cleaning"
distance="0.8 km"
price="₹900 - ₹1,100"
match="82%"
image="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
/>

</ScrollView>

)

}


const Category = ({label}:any)=>{

return(

<TouchableOpacity style={styles.category}>
<Text style={styles.categoryText}>
{label}
</Text>
</TouchableOpacity>

)

}


const JobCard = ({title,distance,price,match,image}:any)=>{

const router = useRouter();

const handleBid = () => {

router.push({
pathname:"/screen/placeBids",
params:{
title,
distance,
price
}
});

};

return(

<View style={styles.card}>

<View style={styles.cardRow}>

<Image
source={{uri:image}}
style={styles.image}
/>

<View style={{flex:1}}>

<Text style={styles.jobTitle}>
{title}
</Text>

<View style={styles.row}>

<MapPin size={14} color="#6B7280"/>

<Text style={styles.distance}>
{distance}
</Text>

<Text style={styles.price}>
{price}
</Text>

</View>

</View>

<View style={styles.matchBox}>

<Text style={styles.matchText}>
{match} match
</Text>

</View>

</View>


<TouchableOpacity
style={styles.bidBtn}
onPress={handleBid}
>
<Text style={styles.bidText}>
Place Bid
</Text>
</TouchableOpacity>

</View>

)

}


const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F7F8FC",
padding:20
},

title:{
fontSize:24,
fontWeight:"700",
marginBottom:20
},

searchRow:{
flexDirection:"row",
gap:10,
marginBottom:20
},

searchBox:{
flex:1,
backgroundColor:"#fff",
flexDirection:"row",
alignItems:"center",
padding:14,
borderRadius:14,
gap:8
},

searchInput:{
flex:1,
fontSize:15,
color:"#000"
},

filterBtn:{
backgroundColor:"#EEF2FF",
padding:14,
borderRadius:14
},

categoryRow:{
flexDirection:"row",
flexWrap:"wrap",
gap:10,
marginBottom:20
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
fontSize:18,
fontWeight:"600",
marginBottom:10
},

card:{
backgroundColor:"#fff",
padding:16,
borderRadius:16,
marginBottom:16
},

cardRow:{
flexDirection:"row",
alignItems:"center",
gap:12
},

image:{
width:55,
height:55,
borderRadius:10
},

jobTitle:{
fontWeight:"600",
fontSize:15
},

row:{
flexDirection:"row",
alignItems:"center",
gap:6,
marginTop:6
},

distance:{
color:"#6B7280"
},

price:{
marginLeft:10,
color:"#111",
fontWeight:"500"
},

matchBox:{
backgroundColor:"#EEF2FF",
padding:8,
borderRadius:12
},

matchText:{
color:"#4F46E5",
fontSize:12,
fontWeight:"500"
},

bidBtn:{
marginTop:14,
borderWidth:1,
borderColor:"#4F46E5",
padding:12,
borderRadius:12,
alignItems:"center"
},

bidText:{
color:"#4F46E5",
fontWeight:"600"
}

})