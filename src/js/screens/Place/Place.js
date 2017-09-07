import React from 'react'
import { connect } from 'react-redux'
import { Container, TopBar, Icon, Image } from 'ui-components'

import { goBack } from 'actions/navigationActions'
import { EventsList } from 'containers'
import { BottomNav } from 'components'

import styleCard from 'ui-components/Card/style.scss'

const response = {"code":200,"data":[{"id":"34387088","begin_time":"2017-08-10T08:00:00.000Z","title":"Дворяне, духовенство и крестьяне: новая экспозиция в Музее сословий России","location_title":"Картинная галерея Ильи Глазунова","description":"<p>В Музее сословий России открылась новая экспозиция. Посетителей приглашают познакомиться с особенностями культуры и быта основных сословий дореволюционной России &mdash; дворянства, духовенства и крестьянства. В основе экспозиции &mdash; личное собрание народного художника СССР Ильи Глазунова.</p>\\n<p>Первый этаж музея посвящен культуре дворянской России XVIII &mdash; начала XX века. Он воспроизводит уклад жизни дворянства в классических усадебных интерьерах, обставленных старинной мебелью, произведениями живописи, гравюрами.</p>\\n<p>Интерьеры второго этажа вдохновлены убранством палат царя Алексея Михайловича. Здесь перед зрителем предстанут произведения иконописи и деревянной храмовой скульптуры.</p>\\n<p>С традиционными промыслами и повседневным бытом крестьян можно познакомиться на третьем этаже музея. Зрители увидят убранство крестьянской избы, расписные сани, сундуки и ларцы, а также самовары, прялки и народные костюмы разных губерний России.</p>\\n<p>Музей открыт для посещения с 11:00 до 19:00 по сеансам: в 11:15, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00 (в четверг дополнительно в 19:00 и 20:00). Осмотреть выставку можно только в составе экскурсионной группы, включающей до 15 человек.</p>","lng":37.607628,"lat":55.746633,"favs_count":0,"is_main":0,"is_bold":0,"is_free":0,"address":"Улица Волхонка, дом 13, строение 2","end_time":"2017-12-31T16:00:00.000Z","restriction":"6+","place_title":"Красная Площадь","place_id":"1","dateFormatted":{"day":10,"month":"августа","time":"11:00","monthInt":8,"yearInt":2017},"dateEndFormatted":{"day":31,"month":"декабря","time":"19:00","monthInt":8,"yearInt":2017}},{"id":"34754088","begin_time":"2017-08-15T08:00:00.000Z","title":"Выставка «Москва глазами современных художников»","location_title":"Государственный музей — культурный центр «Интеграция» имени Н.А. Островского","description":"<p>Творческий союз Art Exhibitions посвятил свою очередную выставку главному празднику москвичей &mdash; Дню города. Тема столицы и ее памятников близка художникам, большинство членов содружества &mdash; выпускники Московского академического художественного училища памяти 1905 года.</p>\\n<p>Отобранные для экспозиции работы выполнены в лучших традициях московской школы живописи. Никита Бестужев представит цикл работ на московскую тематику, Евгений Бардошин запечатлел улицы и переулки старой и новой Москвы, Илья Дроздов &mdash; самые узнаваемые виды и достопримечательности столицы.</p>\\n<p>В рамках специальной секции покажут работы других участников творческого союза &mdash; графику и фотографии.</p>","lng":37.60708,"lat":55.764136,"favs_count":0,"is_main":0,"is_bold":0,"is_free":0,"address":"Улица Тверская, дом 14","end_time":"2017-09-15T15:00:00.000Z","restriction":"6+","place_title":"Красная Площадь","place_id":"1","dateFormatted":{"day":15,"month":"августа","time":"11:00","monthInt":8,"yearInt":2017},"dateEndFormatted":{"day":15,"month":"сентября","time":"18:00","monthInt":8,"yearInt":2017}},{"id":"34933088","begin_time":"2017-08-16T08:00:00.000Z","title":"Выставка «Гладиолусы» в Биологическом музее","location_title":"Государственный биологический музей им. К.А. Тимирязева","description":"<p>Биологический музей имени К.А. Тимирязева представляет экспозицию любимых цветов советских детей и Олимпиады-80. Выставка проводится ежегодно и каждый раз поражает посетителей цветовым разнообразием.</p>\\n<p>Грациозные, высокие и элегантные, гладиолусы традиционно ассоциируются с Днем знаний, но мало кто знает, что их вручали участникам и победителям Олимпийских игр в Москве.</p>\\n<p>Более 70 лет разведением этого вида цветов занимаются участники московского клуба гладиолусоводов, причем большинство из них &mdash; мужчины. Именно они вывели такие знаменитые отечественные сорта, как &laquo;улыбка гагарина&raquo;, &laquo;владимир высоцкий&raquo;, &laquo;сенсация&raquo;. На выставке профессионалы поделятся особенностями выращивания гладиолусов в Подмосковье и секретами агротехники.</p>","lng":37.571525,"lat":55.764328,"favs_count":0,"is_main":0,"is_bold":0,"is_free":0,"address":"Улица Малая Грузинская, дом 15","end_time":"2017-08-17T18:00:00.000Z","restriction":"6+","place_title":"Красная Площадь","place_id":"1","dateFormatted":{"day":16,"month":"августа","time":"11:00","monthInt":8,"yearInt":2017},"dateEndFormatted":{"day":17,"month":"августа","time":"21:00","monthInt":8,"yearInt":2017}}]}

const Place = (props) => {
  let place

  if (!props.placeData) {
    // Подгружаем данные с сервера
    // Вот так можно взять eventId
    // console.log('placeData отсутствует в store')
    // console.log('placeId: ', props.params.placeId)
    place = {
      title: 'Парк Горького',
    }
  }
  else {
    // Покажем то что есть, а остальное подгрузим
    // console.log('placeData присутствует в store')
    // console.log('placeId: ', props.params.placeId, '\n placeData: ', props.placeData)
    place = props.placeData
  }
  const naviGoBack = () => {
    props.onGoBack()
  }
  return (
    <div className='screen'>
      <TopBar
        title={place.title}
        icon={<button onClick={naviGoBack}>
          <Icon type='arrowBack' width='24' height='24' color='#000' />
        </button>}
      />
      <Container stretching scrolling>
        <Image size='large' src={'http://io.yamblz.ru/i/events/34708088_large.jpg'} />
        <div className={`${styleCard.card__info} ${styleCard.card__info_large}`}>
          <p
            style={{ fontSize: '1rem', lineHeight: '1.375rem', color: '#000', marginBottom: 24 }}
          >
            В Большом дворе музея появится «Башня Третьего Интернационала» — ранняя работа Александра Бурганова. Это двухсоставная композиция, которая изображает рабочего и портрет императора Николая II
          </p>
          <h2 className={`${styleCard.card__title} ${styleCard.card__title_large}`}>
            Расписание
          </h2>
          <EventsList payload={response.data} />
        </div>
      </Container>
      <BottomNav />
    </div>
  )
}

export default connect(
  state => ({
    placeData: state.data.placeData,
  }),
  dispatch => ({
    onGoBack: () => {
      dispatch(goBack())
    },
  })
)(Place)

