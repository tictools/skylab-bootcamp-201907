function RetrieveCategories(props) {
    const { arrayJokes } = props

    return <div>
        {Object.values(arrayJokes.result).map(item => {
            return <article className="joke-container" key={`${item.id}`}>
                <p className="joke">{item.value}</p>
            </article>
        })}
    </div>

}

function RetrieveRandom(props) {
    const { arrayRandom } = props
    const joke = Object.values(arrayRandom.value)
    const jokeId = Object.values(arrayRandom.id)

    return <div>
        <article className="joke-container" key={`${jokeId}`}>
            <p className="joke">{joke}</p>
        </article>
    </div>
}


