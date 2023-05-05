// Component imports
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Linking } from 'react-native'

// Exported function
export default function Advice({navigation}){
    return(
        <SafeAreaView style={styles.background}>
            <ScrollView>

                {/* Grocery Deals */}
                <View style={styles.widget}>
                    <Text style={styles.heading}>
                        Grocery Deals
                    </Text>
                    <Text style={styles.article}>
                        At Countdown, there are the following deals and more:
                        {"\n"}- Countdown Fresh NZ Salmon Fillet 1-2 Pack for $42.40
                        {"\n"}- Sealord Sensations Tuna Smoked 4 for $5.80
                        {"\n"}- Dove Body Wash for $9.59
                        {"\n"}Sea Cuisine Prawns Vannamei Raw Cutlets for $20.
                        <Text style={styles.article} onPress={() => Linking.openURL('https://www.countdown.co.nz/shop/specials')}>{"\n"}Visit the website for more information.</Text>
                        {"\n\n"}At PAK'nSAVE, there are the following deals and more:
                        {"\n"}- Chicken Wings $5.99/kg
                        {"\n"}- Tip Top Trumpet 4s for $5.99 
                        {"\n"}- Pams Flour High Grade 1.5kg for $1.99 
                        {"\n"}- Kingfisher Indian Lager 330ml 12 Pack Bottles $20.99 each
                        <Text style={styles.article} onPress={() => Linking.openURL('https://www.paknsave.co.nz/deals')}>{"\n"}Visit the website for more information.</Text>
                        {"\n\n"}At New World, there are the following deals and more:
                        {"\n"}- NZ Chicken Drumsticks for $5.99/kg
                        {"\n"}- Coca-Cola Soft Drink 2.25l 2 for $6.00
                        {"\n"}- Brown Onions $2.49/kg
                        <Text style={styles.article} onPress={() => Linking.openURL('https://www.newworld.co.nz/shop/specials')}>{"\n"}Visit the website for more information.</Text>
                    </Text>
                </View>

                {/* Entertainment Deals */}
                <View style={styles.widget}>
                    <Text style={styles.heading}>
                        Entertainment Deals
                    </Text>
                    <Text style={styles.article}>
                        On GrabOne, there are many entertainment deals:
                        {"\n"}- Mate Day Double Superpass for Rainbow's End for $80
                        {"\n"}- Luxury 5-Star Stay for 2 at Cordis Auckland for $299
                        {"\n"}- Edge Cut Colour & Beauty Hamilton Keratin Hair Straightening Treatment for $99      
                        <Text style={styles.article} onPress={() => Linking.openURL('https://new.grabone.co.nz/activities-events-outdoors/fun-leisure/p/thrill-zone-entertainment-1?region=auckland')}>{"\n"}Visit GrabOne for more information.</Text>
                        {"\n\n"}On BookMe, there are many entertainment deals:
                        {"\n"}- Sea Life Kelly Tarltons Aquarium from $20.50
                        {"\n"}- Hobbiton Day Tour - Late Morning Start from $239
                        {"\n"}- Skydive Auckland - 13,000ft Tandem from $255
                        {"\n"}- America's Cup Sailing Experience from $95
                        <Text style={styles.article} onPress={() => Linking.openURL('https://www.bookme.co.nz/things-to-do/auckland/home')}>{"\n"}Visit BookMe for more information.</Text>
                    </Text>
                </View>
                {/* Academic/Student Deals */}
                <View style={styles.widget}>
                    <Text style={styles.heading}>
                        Academic/Student Deals
                    </Text>
                    <Text style={styles.article}>
                        - StudentCard has negotiated discounts with many NZ retailers. Purchase a card for $20 and the deals are all yours.
                        {"\n"}- UNiDAYS is completely free to sign up to and completely online, there's no need to remember a card. They provide deals of large fashion and health & beauty companies.
                        {"\n"}- StudentBeans is not as localised as the previous two, they have deals with major international retailers. Again, this is a free online membership.
                        {"\n\n"}Major telecommunication companies offer bonus deals for students...
                        {"\n"}- 2Degrees customers can get 500MB extra data per weekend, this can be limited/rejected dependent on your current plan.
                        {"\n"}- Spark customers can get 1GB of monthly bonus data and free calls to Spark numbers.
                    </Text>
                </View>

                {/* Fuel Deals */}
                <View style={styles.widget}>
                    <Text style={styles.heading}>
                        Fuel Deals
                    </Text>
                    <Text style={styles.article}>
                        Fuel cards can give you little savings that tend to add up nicely...
                        {"\n"}- Mobil gives 10c per litre off petrol
                        {"\n"}- Caltex, Challenge, and Z give 8c per litre off petrol
                        {"\n"}- BP gives 8c per litre off petrol
                        <Text style={styles.article} onPress={() => Linking.openURL('https://nzfuelcards.co.nz/fuel-card-offers/petrol-offers/')}>Apply for a Fuel Card here!</Text>
                    </Text>
                </View>

                 {/* How to manage money */}
                <View style={styles.widget}>
                    <Text style={styles.heading}>
                       How Savings Can Save the Economy
                    </Text>
                    <Text style={styles.article}>
                        How Savings Can Save the Economy
                        {"\n"}- The article argues that in a slow economic recovery, having savings is a blessing. 
                        {"\n"}- While people tend to spend more during a robust economy, 
                        it is essential to have money saved up in a recession to cushion against job losses, 
                        unexpected expenses, and the rising cost of living. 
                        {"\n"}- This article recommends setting aside a portion of income regularly and prioritizing essential expenses to help build up savings. 
                        The author emphasizes the importance of creating a budget, reducing expenses, and finding ways to earn extra income to increase savings. 
                        <Text style={styles.article} onPress={() => Linking.openURL('https://www.investopedia.com/financial-edge/0310/savings-are-a-blessing-in-a-slow-recovery.aspx')}>{"\n"}Visit investopedia for more information.</Text>
                       
                    </Text>
                </View>

                {/* Footer widget showing when the information was last updated */}
                <View style={styles.footerWidget}>
                    <Text style={styles.article}>Last updated: Friday 5th May 2023 6:30</Text>
                </View>

               



            </ScrollView>
        </SafeAreaView>
    )
}

// Styling
const styles = StyleSheet.create({
    background:{
        flex:1
        , paddingTop: 20
        , backgroundColor: '#ffdeb7'
    },
    widget:{
        marginHorizontal: 20
        , marginBottom: 20
        , borderRadius: 20
        , borderColor: '#ff8100'
        , borderWidth: 15
        , width: 370
        , padding: 15
        , backgroundColor: '#ffe9de'
        , justifyContent: 'space-evenly'
    },
    heading:{
        fontWeight: 'bold'
        , fontSize: 16
        , textAlign: 'center'
    },
    article:{
        fontSize: 14
    },
    footerWidget:{
        marginHorizontal: 20
        , marginBottom: 20
        , width: 370
        , padding: 15
        , justifyContent: 'space-evenly'
    }
})