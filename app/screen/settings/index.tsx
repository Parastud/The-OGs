import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import {
    ArrowLeft,
    Bell,
    LogOut,
    Moon,
    Shield,
    User
} from "lucide-react-native";

import { useRouter } from "expo-router";

export default function SettingsScreen(){

const router = useRouter();

return(

<View style={styles.container}>

{/* Header */}

<View style={styles.header}>

<TouchableOpacity
onPress={()=>router.back()}
>
<ArrowLeft size={22}/>
</TouchableOpacity>

<Text style={styles.title}>
Settings
</Text>

<View style={{width:22}}/>

</View>


<ScrollView>

<Text style={styles.section}>
Account
</Text>

<View style={styles.card}>

<SettingItem
icon={<User size={18} color="#4F46E5"/>}
title="Edit Profile"
/>

<SettingItem
icon={<Bell size={18} color="#4F46E5"/>}
title="Notifications"
/>

<SettingItem
icon={<Shield size={18} color="#4F46E5"/>}
title="Privacy"
/>

</View>


<Text style={styles.section}>
Preferences
</Text>

<View style={styles.card}>

<SettingItem
icon={<Moon size={18} color="#4F46E5"/>}
title="Dark Mode"
/>

</View>


<View style={styles.card}>

<SettingItem
icon={<LogOut size={18} color="#EF4444"/>}
title="Logout"
danger
/>

</View>

</ScrollView>

</View>

)
}


const SettingItem = ({icon,title,danger}:any)=>{

return(

<TouchableOpacity style={styles.item}>

<View style={styles.row}>
{icon}
<Text style={[
styles.itemText,
danger && {color:"#EF4444"}
]}>
{title}
</Text>
</View>

<Text style={styles.arrow}>
›
</Text>

</TouchableOpacity>

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

section:{
paddingHorizontal:20,
marginTop:20,
marginBottom:10,
color:"#6B7280"
},

card:{
backgroundColor:"#fff",
marginHorizontal:20,
borderRadius:16
},

item:{
flexDirection:"row",
justifyContent:"space-between",
padding:16,
borderBottomWidth:0.5,
borderColor:"#eee"
},

row:{
flexDirection:"row",
alignItems:"center",
gap:10
},

itemText:{
fontSize:15,
fontWeight:"500"
},

arrow:{
fontSize:18,
color:"#9CA3AF"
}

});