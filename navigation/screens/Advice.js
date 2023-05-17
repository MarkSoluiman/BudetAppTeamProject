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
                        {"\n"}- Fresh Vegetable Broccoli Head $2 each
                        {"\n"}- Countdown Free Farmed NZ Pork Leg Roast Bone in $8.50/kg
                        {"\n"}- Leader Brand Fresh Vegetable Slaw Salad Coleslaw 450g $4.50 each
                        {"\n"}There are also many savings among soft drinks.
                        <Text style={styles.article} onPress={() => Linking.openURL('https://www.countdown.co.nz/shop/specials')}>{"\n"}Visit the website for more information.</Text>
                        {"\n\n"}At PAK'nSAVE, there are the following deals and more:
                        {"\n"}- Chicken Wings $5.99/kg
                        {"\n"}- Red Seedless Grapes 500g $4.99 each
                        {"\n"}- Tip Top Ice Cream 2L $5.49 each
                        {"\n"}- Value Table Spread 500g $1.39 each
                        <Text style={styles.article} onPress={() => Linking.openURL('https://www.paknsave.co.nz/deals')}>{"\n"}Visit the website for more information.</Text>
                        {"\n\n"}At New World, there are the following deals and more:
                        {"\n"}- NZ Beef Rump Steak $14.99/kg
                        {"\n"}- NZ Chicken Drumsticks $5.99 each
                        {"\n"}- Carrots $2.49/kg
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
                        {"\n"}- Rainbow;s End Grab a Mate Double Superpass from $80
                        {"\n"}- One Game of Mini Golf from $9 in Mount Wellington
                        <Text style={styles.article} onPress={() => Linking.openURL('https://new.grabone.co.nz/activities-events-outdoors/fun-leisure/p/thrill-zone-entertainment-1?region=auckland')}>{"\n"}Visit GrabOne for more information.</Text>
                        {"\n\n"}On BookMe, there are many entertainment deals:
                        {"\n"}- Crystal Mountain from $12.50
                        {"\n"}- Auckland Adventure Park - Unlimited Ride Passes from $39
                        {"\n"}- Paradice Ice Skating Botany from $10.50
                        {"\n"}- Sky Tower SkySlide Rider Bundle from $40
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

                {/* Footer widget showing when the information was last updated */}
                <View style={styles.footerWidget}>
                    <Text style={styles.article}>Last updated: Friday 5th May 2023 18:14</Text>
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
        , borderRadius: 10
        , borderColor: '#ff8100'
        , borderWidth: 3
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