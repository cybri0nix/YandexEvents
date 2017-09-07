import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'ui-components'
import style from './style.scss'

const SlideCard = props => (
  <div
    className={`${style.card} ${style[`card_${props.size}`]}`}
    style={props.style}
  >
    <Image src={props.src} size={props.size} />
    <div
      className={`${style.card__info} ${style[`card__info_${props.size}`]}`}
    >
      <h3 className={`${style.card__title} ${style[`card__title_${props.size}`]}`}>
        {props.title}
      </h3>
      <p className={style.card__text}>
        {props.date}
      </p>
    </div>
  </div>
)

SlideCard.defaultProps = {
  size: 'small',
  src: 'https://placehold.it/350x50',
  title: null,
  date: null,
  style: null,
}

SlideCard.propTypes = {
  size: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  style: PropTypes.object,
}

export default SlideCard
