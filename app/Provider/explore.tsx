import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import { Search, SlidersHorizontal, MapPin } from "lucide-react-native";

import { ScreenWrapper } from "@/src/components/wrapper";
import { COLORS } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";


const jobs = [
  {
    id: "1",
    title: "Same-day Tutor work needed",
    distance: "4.8 km",
    price: "₹1200 - ₹4850",
    match: "91",
    image: "https://picsum.photos/200"
  },
  {
    id: "2",
    title: "AC Repair urgently",
    distance: "1.6 km",
    price: "₹650 - ₹4650",
    match: "77",
    image: "https://picsum.photos/201"
  }
];


export default function Explore() {

  return (
    <ScreenWrapper>

      {/* Header */}
      <LinearGradient
        colors={["#6D5DF6", "#8B7BFF"]}
        style={styles.header}
      >

        <Text style={styles.headerTitle}>
          Explore Jobs
        </Text>

        <Text style={styles.headerSubtitle}>
          Find work near you
        </Text>

      </LinearGradient>


      {/* Search */}
      <View style={styles.searchWrapper}>

        <View style={styles.searchBox}>
          <Search size={18} color="#888" />

          <TextInput
            placeholder="Search jobs..."
            placeholderTextColor="#999"
            style={styles.searchInput}
          />

        </View>

        <TouchableOpacity style={styles.filterBtn}>
          <SlidersHorizontal size={20} color={COLORS.primary} />
        </TouchableOpacity>

      </View>


      {/* Categories */}
      <View style={styles.categoryRow}>
        {["Plumbing","Electrical","Cleaning","AC Repair"].map(item=>(
          <TouchableOpacity key={item} style={styles.categoryChip}>
            <Text style={styles.categoryText}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>


      {/* Jobs */}
      <View style={{ paddingBottom: 120 }}>
        {jobs.map((item) => (
          <View key={item.id} style={styles.jobCard}>
            <View style={styles.jobTop}>
              <Image source={{ uri: item.image }} style={styles.jobImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.jobTitle}>{item.title}</Text>
                <View style={styles.jobMeta}>
                  <MapPin size={14} color="#888" />
                  <Text style={styles.distance}>{item.distance}</Text>
                </View>
              </View>
            </View>

            <View style={styles.jobFooter}>
              <Text style={styles.price}>{item.price}</Text>
              <View style={styles.matchBadge}>
                <Text style={styles.matchText}>{item.match}%</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.bidBtn}
              onPress={() => router.push({ pathname: "/job/[id]", params: { id: item.id } })}
            >
              <Text style={styles.bidText}>View & Bid</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

    </ScreenWrapper>
  );
}


const styles = StyleSheet.create({

header:{
padding:20,
borderBottomLeftRadius:30,
borderBottomRightRadius:30,
marginBottom:20
},

headerTitle:{
fontSize:24,
fontFamily:FONTS.BOLD,
color:"#fff"
},

headerSubtitle:{
color:"#fff",
marginTop:4
},

searchWrapper:{
flexDirection:"row",
gap:10,
paddingHorizontal:16,
marginTop:-30
},

searchBox:{
flex:1,
flexDirection:"row",
alignItems:"center",
backgroundColor:"#fff",
padding:12,
borderRadius:14,
shadowColor:"#000",
shadowOpacity:0.05,
shadowRadius:8,
elevation:4
},

searchInput:{
flex:1,
marginLeft:8,
color:"#000"
},

filterBtn:{
backgroundColor:"#fff",
padding:14,
borderRadius:14,
shadowColor:"#000",
shadowOpacity:0.05,
shadowRadius:8,
elevation:4
},

categoryRow:{
flexDirection:"row",
paddingHorizontal:16,
marginVertical:16,
gap:10
},

categoryChip:{
paddingHorizontal:14,
paddingVertical:8,
backgroundColor:"#fff",
borderRadius:20,
shadowColor:"#000",
shadowOpacity:0.03,
shadowRadius:6,
elevation:2
},

categoryText:{
fontFamily:FONTS.SEMIBOLD
},

jobCard:{
backgroundColor:"#fff",
marginHorizontal:16,
marginBottom:16,
padding:16,
borderRadius:16,
shadowColor:"#000",
shadowOpacity:0.05,
shadowRadius:8,
elevation:4
},

jobTop:{
flexDirection:"row",
gap:12
},

jobImage:{
width:60,
height:60,
borderRadius:12
},

jobTitle:{
fontFamily:FONTS.SEMIBOLD,
fontSize:15
},

jobMeta:{
flexDirection:"row",
alignItems:"center",
gap:4,
marginTop:4
},

distance:{
color:"#888"
},

jobFooter:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginTop:12
},

price:{
fontFamily:FONTS.BOLD,
color:COLORS.primary
},

matchBadge:{
backgroundColor:"#E8F5E9",
paddingHorizontal:10,
paddingVertical:4,
borderRadius:10
},

matchText:{
color:"#16A34A",
fontFamily:FONTS.SEMIBOLD
},

bidBtn:{
backgroundColor:COLORS.primary,
marginTop:12,
padding:14,
borderRadius:12,
alignItems:"center"
},

bidText:{
color:"#fff",
fontFamily:FONTS.SEMIBOLD
}

});