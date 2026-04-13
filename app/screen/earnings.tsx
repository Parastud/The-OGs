import {
View,
Text,
StyleSheet,
ScrollView,
TouchableOpacity
} from "react-native";

import {
Bell,
Wallet,
TrendingUp,
Banknote,
Wrench,
Building,
Zap
} from "lucide-react-native";

export default function EarningsScreen() {

return (

<View style={styles.container}>

<ScrollView showsVerticalScrollIndicator={false}>

{/* Header */}

<View style={styles.header}>

<Text style={styles.brand}>Gigly</Text>

<Text style={styles.title}>Earnings</Text>

<Bell size={22} color="#111"/>

</View>


{/* Month Card */}

<View style={styles.card}>

<Text style={styles.small}>
This month
</Text>

<Text style={styles.amount}>
₹8,400
</Text>

<View style={styles.badge}>
<Text style={styles.badgeText}>
+23% vs last month
</Text>
</View>

</View>


{/* Weekly Activity */}

<View style={styles.card}>

<Text style={styles.sectionTitle}>
Weekly Activity
</Text>

<View style={styles.chart}>

<View style={[styles.bar,{height:30}]}/>
<View style={[styles.bar,{height:45}]}/>
<View style={[styles.barActive,{height:70}]}/>
<View style={[styles.bar,{height:40}]}/>
<View style={[styles.barActive,{height:80}]}/>
<View style={[styles.bar,{height:30}]}/>
<View style={[styles.bar,{height:45}]}/>

</View>

<View style={styles.days}>

<Text>M</Text>
<Text>T</Text>
<Text>W</Text>
<Text>T</Text>
<Text>F</Text>
<Text>S</Text>
<Text>S</Text>

</View>

</View>


{/* Stats */}

<View style={styles.statsRow}>

<View style={styles.statCard}>
<Text style={styles.statTitle}>JOBS</Text>
<Text style={styles.statValue}>12</Text>
</View>

<View style={styles.statCard}>
<Text style={styles.statTitle}>AVG</Text>
<Text style={styles.statBlue}>₹700</Text>
</View>

<View style={styles.statCard}>
<Text style={styles.statTitle}>PENDING</Text>
<Text style={styles.statOrange}>₹1,200</Text>
</View>

</View>


{/* Withdraw Card */}

<View style={styles.card}>

<View style={styles.withdrawHeader}>

<Wallet size={20} color="#4F46E5"/>

<Text style={styles.sectionTitle}>
Available to withdraw
</Text>

</View>

<Text style={styles.withdrawAmount}>
₹7,200
</Text>

<TouchableOpacity style={styles.withdrawBtn}>

<Text style={styles.withdrawText}>
Withdraw to bank
</Text>

</TouchableOpacity>

</View>


{/* Transaction */}

<View style={styles.sectionHeader}>

<Text style={styles.sectionTitle}>
Transaction history
</Text>

<Text style={styles.filter}>
Filter
</Text>

</View>


{/* Transaction List */}

{transactions.map((item,index)=>(
<View key={index} style={styles.transaction}>

<View style={styles.iconCircle}>
{item.icon}
</View>

<View style={{flex:1}}>

<Text style={styles.transTitle}>
{item.title}
</Text>

<Text style={styles.transDate}>
{item.date}
</Text>

</View>

<View>

<Text style={styles.transAmount}>
{item.amount}
</Text>

<Text style={styles.status}>
{item.status}
</Text>

</View>

</View>
))}

</ScrollView>

</View>

);
}

const transactions = [

{
title:"Deep Kitchen Cleaning",
date:"Completed Oct 24, 2023",
amount:"₹1,200",
status:"CREDITED",
icon:<Wrench size={18} color="#4F46E5"/>
},

{
title:"Pipe Leakage Fix",
date:"Completed Oct 22, 2023",
amount:"₹450",
status:"CREDITED",
icon:<Wrench size={18} color="#4F46E5"/>
},

{
title:"Withdrawal to HDFC bank",
date:"Oct 20, 2023",
amount:"-₹5,000",
status:"PROCESSED",
icon:<Building size={18} color="#8B5CF6"/>
},

{
title:"AC Maintenance",
date:"Completed Oct 18, 2023",
amount:"₹850",
status:"CREDITED",
icon:<Zap size={18} color="#4F46E5"/>
}

];

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

title:{
fontSize:18,
fontWeight:"600"
},

card:{
backgroundColor:"#fff",
marginHorizontal:20,
padding:20,
borderRadius:20,
marginBottom:16
},

small:{
color:"#6B7280"
},

amount:{
fontSize:30,
fontWeight:"700",
color:"#4F46E5",
marginTop:6
},

badge:{
backgroundColor:"#D1FAE5",
alignSelf:"flex-start",
paddingHorizontal:10,
paddingVertical:4,
borderRadius:20,
marginTop:10
},

badgeText:{
color:"#059669"
},

sectionTitle:{
fontSize:16,
fontWeight:"600"
},

chart:{
flexDirection:"row",
alignItems:"flex-end",
justifyContent:"space-between",
marginTop:20
},

bar:{
width:18,
backgroundColor:"#E5E7EB",
borderRadius:6
},

barActive:{
width:18,
backgroundColor:"#4F46E5",
borderRadius:6
},

days:{
flexDirection:"row",
justifyContent:"space-between",
marginTop:8
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
width:"30%",
alignItems:"center"
},

statTitle:{
fontSize:12,
color:"#6B7280"
},

statValue:{
fontSize:18,
fontWeight:"700"
},

statBlue:{
fontSize:18,
fontWeight:"700",
color:"#4F46E5"
},

statOrange:{
fontSize:18,
fontWeight:"700",
color:"#D97706"
},

withdrawHeader:{
flexDirection:"row",
alignItems:"center",
gap:8
},

withdrawAmount:{
fontSize:26,
fontWeight:"700",
marginTop:8
},

withdrawBtn:{
backgroundColor:"#4F46E5",
padding:14,
borderRadius:14,
marginTop:12,
alignItems:"center"
},

withdrawText:{
color:"#fff",
fontWeight:"600"
},

sectionHeader:{
flexDirection:"row",
justifyContent:"space-between",
padding:20
},

filter:{
color:"#4F46E5"
},

transaction:{
backgroundColor:"#fff",
marginHorizontal:20,
padding:14,
borderRadius:16,
flexDirection:"row",
alignItems:"center",
gap:12,
marginBottom:12
},

iconCircle:{
width:40,
height:40,
borderRadius:20,
backgroundColor:"#F1F2F6",
alignItems:"center",
justifyContent:"center"
},

transTitle:{
fontWeight:"600"
},

transDate:{
color:"#6B7280",
fontSize:12
},

transAmount:{
fontWeight:"600"
},

status:{
fontSize:11,
color:"#059669"
}

});