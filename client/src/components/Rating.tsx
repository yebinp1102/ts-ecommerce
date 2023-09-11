
const Rating = (props: { rating: number, numReviews?: number, caption?: string}) => {
  const {rating, numReviews, caption} = props;

  return (
    <div className="rating">

      {/* 1 star */}
      <span>
      <i className={rating >= 1 ? 'fas fa-star' : rating >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
      </span>

      {/* 2 star */}
      <span>
        <i className={rating >= 2 ? 'fas fa-star' : rating >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
      </span>
      
      {/* 3 star */}
      <span>
        <i className={rating >= 3 ? 'fas fa-star' : rating >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
      </span>

      {/* 4 star */}
      <span>
        <i className={rating >= 4 ? 'fas fa-star' : rating >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
      </span>

      {/* 5 star */}
      <span>
        <i className={rating >= 5 ? 'fas fa-star' : rating >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
      </span>

      {caption ? (
        <span>{caption}</span>
      ) : numReviews != 0 ? (
        <span>{' ' + numReviews + ' views'}</span>
      ): (
        ''
      )}
    </div>
  )
}

export default Rating
