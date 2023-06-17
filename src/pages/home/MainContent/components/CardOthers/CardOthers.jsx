import Card from "../../../../../components/Card/Card";
import { Subtitle } from "../CardMoreInfo/CardMoreInfo";
import globalIcon from "../../../../../assets/global-icon.gif"
import visibilityIcon from "../../../../../assets/visibility-icon.gif"
import pressureIcon from "../../../../../assets/pressure-icon.gif"
import cloudsIcon from "../../../../../assets/clouds-icon.gif"

export default function CardOthers({ country, visibility, sea_level, clouds }) {
    return (
        <Card>
            <Subtitle name='País' weatherInfo={country} icon={globalIcon} />
            <Subtitle name='Visibilidade' weatherInfo={visibility} metric='Km' icon={visibilityIcon} />
            <Subtitle name='Pressão' weatherInfo={sea_level} metric=' hPa' icon={pressureIcon} />
            <Subtitle name='Nuvens' weatherInfo={clouds} metric='%' icon={cloudsIcon} />
        </Card>
    )
}