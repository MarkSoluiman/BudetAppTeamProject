// Component imports
import React, { Component } from 'react'
import { StyleSheet, View, Text, Linking, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

// Exported function
export default function News({navigation}){
    return(
        <SafeAreaView style={styles.background}>
            <ScrollView>

                {/* Article 1 */}
                <View style={styles.widget}>
                    <Text 
                        style={styles.heading} 
                        onPress={() => Linking.openURL('https://www.rnz.co.nz/news/sport/489339/nz-to-host-inaugural-international-women-s-rugby-tournment')}
                    >
                        NZ to host inaugural international women's rugby tournment
                    </Text>
                    <Image source={require('../../assets/rugby.jpeg')} style={styles.images} />
                    <Text style={styles.article}>
                    New Zealand will host the inaugural women's top six rugby series in October. In January World Rugby announced an annual sixteen-team, three-tier global competition. The top six teams in WXV1 will compete in New Zealand in a nine test series. England, France and Wales, who finished top of the recent Six Nations will be joined by the top three teams from the Pacific Four Series. The Black Ferns first test against Australia in June and then tests against Canada and the USA in early July will count towards qualification. WXV 1 is the top tier of World Rugby's inaugural three-tiered global initiative aimed at increasing the competitiveness, reach, value and impact of the elite women's game. New Zealand Rugby's head of professional rugby Chris Lendrum said the tournament provides an opportunity to further bolster the momentum in the woman's game following the 2022 Rugby World Cup. "To bring the likes of England and France down to New Zealand and see some of the rugby again that we saw last year is tremendously exciting."
                    </Text>
                </View>

                {/* Article 2 */}
                <View style={styles.widget}>
                    <Text 
                        style={styles.heading} 
                        onPress={() => Linking.openURL('https://www.stuff.co.nz/business/131955950/anz-posts-halfyear-profit-of-more-than-1-billion-up-14')}
                    >
                        ANZ posts half-year profit of more than $1 billion, up 14%
                    </Text>
                    <Image source={require('../../assets/anz.jpg')} style={styles.images} />
                    <Text style={styles.article}>
                    ANZ has recorded a 14%​ increase in half-year profits compared to the same time a year earlier. Chief executive Antonia Watson said the bank had made an after-tax cash profit of $1.107 billion in the six months ending March 31, compared to $968 million in the same period last year. It was up 1% comapred to the profit made in the six months to September. It follows BNZ’s announcement on Thursday of a 13.5% rise in profit for the same six-month period. The massive leap in BNZ profit was noticed in the Beehive, but Commerce and Consumer Affairs Minister Duncan Webb has so far not decided whether to order the Commerce Commission to investigate the state of competition in the banking industry.                </Text>
                </View>

                {/* Article 3 */}
                <View style={styles.widget}>
                    <Text 
                        style={styles.heading} 
                        onPress={() => Linking.openURL('https://www.stuff.co.nz/business/131961297/heres-what-the-nzuk-free-trade-agreement-means-for-you')}
                    >
                        Here's what the NZ-UK free trade agreement means for you
                    </Text>
                    <Image source={require('../../assets/choc.jpg')} style={styles.images} />
                    <Text style={styles.article}>
                        News that New Zealand’s free trade agreement with the United Kingdom had been fast tracked had politicians and exporters all aflutter on Friday. The deal, struck in March 2022, is expected to deliver a $1 billion boost to New Zealand’s GDP, but what even is a free-trade agreement? And why should the average Kiwi care? Often abbreviated to FTA, a free-trade agreement sets the rules for how countries treat each other when doing business – importing and exporting goods or services and investing. The main focus of an FTA is on economic benefits and encouraging trade between the countries by making it easier and cheaper to do business.
                    </Text>
                </View>

                {/* Article 1 */}
                <View style={styles.widget}>
                    <Text 
                        style={styles.heading} 
                        onPress={() => Linking.openURL('https://www.rnz.co.nz/news/business/487394/reserve-bank-raises-ocr-to-5-point-25-percent')}
                    >
                        Reserve Bank raises OCR to 5.25%
                    </Text>
                    <Image source={require('../../assets/rbnz.jpeg')} style={styles.images} />
                    <Text style={styles.article}>
                        The Reserve Bank has raised the official cash rate (OCR) by 50 basis points to 5.25 percent. The decision is above expectations and takes the benchmark rate to its highest level since late 2008. The Reserve Bank (RBNZ) says the economy is slowing and the labour market easing but inflation remains high. Economists and financial markets were overwhelmingly expecting just a 25 basis point increase. The Monetary Policy Committee (MPC) said there were signs that inflation and domestic activity were slowing, but inflation was still too high and the labour market still too stretched. Recent falls in wholesale interest rates leading to lower lending rates appeared to be the tipping point in the bigger increase. "As a result, a 50 basis point increase in the OCR was seen as helping to maintain the current lending rates faced by businesses and households, while also supporting an increase in retail deposit rates," a record of the MPC meeting said. However, the committee did not repeat previous statements about higher rates being necessary. "Looking ahead, the committee is expecting to see a continued slowing in domestic demand and a moderation in core inflation and inflation expectations. The extent of this moderation will determine the direction of future monetary policy." In February the RBNZ pointed to the cash rate rising to a high of 5.5 percent in the second half of the year, as the economy slipped into recession. The latest decision had no supporting economic or financial forecasts. RBNZ's MPC reviews the OCR seven times a year. It uses the OCR to "achieve and maintain price stability" and "support maximum sustainable employment".
                    </Text>
                </View>

                {/* Article 2 */}
                <View style={styles.widget}>
                    <Text 
                        style={styles.heading} 
                        onPress={() => Linking.openURL('https://www.rnz.co.nz/news/business/487215/living-wage-set-to-rise-nearly-10-percent-in-september')}
                    >
                        Living wage set to rise nearly 10% in September
                    </Text>
                    <Image source={require('../../assets/family.jpg')} style={styles.images} />
                    <Text style={styles.article}>
                        The living wage is being increased to $26 per hour from 1 September. The Living Wage Movement said the wage has undergone a full recalculation, resulting in thousands of workers receiving a pay increase. It is an increase of $2.35 or 9.9 percent on the 2022/23 rate. Employers who take part in the Living Wage Movement agree to pay their employees the set amount per hour. According to their website, it is set apart from the minimum wage, and is worker- and whānau-focused to ensure workers can live with dignity and participate in society. A full recalculation of the living wage happens every five years. In other years, the living wage is linked to movement in New Zealand's average hourly wages. Chairperson of the Living Wage Movement Rev Stephen King said "the full recalculation ensures the living wage will continue to address in-work poverty, and offer working people greater security and well-being". He said "with rising costs and pressures on low-waged workers, we are seeing increased hardship in the community". King said the recalculation quantified how much costs had gone up. Rose Kavapalu, a cleaner who is paid the living wage, said the increase of $2.35 an hour would make a huge impact in covering costs such as food and petrol.
                    </Text>
                </View>

                {/* Article 3 */}
                <View style={styles.widget}>
                    <Text 
                        style={styles.heading} 
                        onPress={() => Linking.openURL('https://www.stuff.co.nz/life-style/homed/real-estate/131688772/house-price-falls-spread-heres-where-house-prices-have-fallen-by-20')}
                    >
                        Here's where house prices have fallen by 20%
                    </Text>
                    <Image source={require('../../assets/house.jpg')} style={styles.images} />
                    <Text style={styles.article}>
                        Steep house price falls are no longer confined to Wellington and Auckland, with double-digit annual declines in many markets around the country, CoreLogic says. The property research company’s latest House Price Index shows prices nationwide fell 1.1% in March to an average of $933,770. But the monthly rate of decline had picked up over the last two months, after a couple of flatter months in December and January, CoreLogic chief property economist Kelvin Davidson said. It meant the national average price had fallen 10.5%, or $109,491 over the last year, from $1.04 million in March last year. “The housing market mood is pretty subdued at present, with both buyers and sellers having become accepting of tough fundamentals and lower prices,” he said. Prices were down annually in all the main centres, and in every regional market except Queenstown, but in some markets the decline was more significant. Wellington remained the weakest market, with the region’s average price down 20% to $902,809 in March, from $1.12m at the same time last year. That price trend was repeated across the region, with Upper Hutt, Lower Hutt, Porirua, and Wellington city down by 21%, 20.6%, 19.7%, and 19.6% respectively. Kapiti Coast prices fell by 14.8%.
                    </Text>
                </View>

                {/* Article 4 */}
                <View style={styles.widget}>
                    <Text 
                        style={styles.heading}
                        onPress={() => Linking.openURL('https://thespinoff.co.nz/business/15-03-2023/what-happened-to-silicon-valley-bank-will-it-spread-and-could-it-happen-here')}
                    >
                        What happened to Silicon Valley Bank? Will it spread - and could it happen here?
                    </Text>
                    <Image source={require('../../assets/silicon-valley.jpg')} style={styles.images} />
                    <Text style={styles.article}>
                        Silicon Valley Bank (SVB) abruptly collapsed on Friday (US time) after a good old-fashioned bank run saw many customers withdraw funds, leading to it running out of cash. Rumours had swirled about its solvency for some time, but the triggering events were warnings from the likes of Peter Thiel’s Founder’s Fund that companies it had invested in should get their deposits out. Because banks always loan out more than they have deposited, when enough people asked for their money, Silicon Valley Bank was caught without enough liquid assets on hand to meet its obligations. SVB was the largest bank to fail since Washington Mutual during the GFC in 2008, and the second-largest in US history, with US$209bn in deposits. It was closely followed by the failure of Signature Bank, a Wall St firm with significant exposure to the crypto sector. While its asset base, at US$88bn, was less than half that of SVB’s, the failure of another bank with close links to the tech sector so suddenly led to fears of contagion – of more banks tipping over. The US, unlike New Zealand, has hundreds of relatively small banks, many of which saw sharp declines in their value as investors speculated about whether these were isolated incidents or indicative of more widespread issues.
                    </Text>
                </View>

                {/* Footer view to show last updated time */}
                <View style={styles.footerWidget}>
                    <Text style={styles.article}>Last updated: Friday 5th May 2023 18:26</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

// Styling
const styles = StyleSheet.create({
    background:{
        flex:1
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
    footerWidget:{
        marginHorizontal: 20
        , marginBottom: 20
        , width: 370
        , padding: 15
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
    images: {
        width: '90%'
        , height: 200
        , borderColor: '#ff8100'
        , borderWidth: 3
        , marginVertical: 10
        , alignSelf: 'center'}
})