class App extends React.Component {
    constructor() {
        super()

        this.state = { printItem: undefined, categories: [], jokes: [], random: [] }


        this.handleSearchCategories = this.handleSearchCategories.bind(this)
        this.handleRandomButton = this.handleRandomButton.bind(this)

    }

    componentDidMount() {
        logic.getCategories()
            .then(data => {
                this.setState({ categories: data })
            })
    }



    handleSearchCategories(category) {
        logic.searchJokes(undefined, undefined, category)
            .then(joke => {
                this.setState({ jokes: joke })
                this.setState({ printItem: 'printCategory' })
            })
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleRandomButton() {

        logic.getRandomJoke()
            .then(joke => {
                this.setState({ random: joke })
                this.setState({ printItem: 'printRandom' })
            })
            .catch(({ message }) => this.setState({ error: message }))
    }


    render() {
        const { state: { categories, jokes, printItem, random }, handleSearchCategories, handleRandomButton } = this

        return <>
            <div className="wrapper">
                <h1>Chuck Generator</h1>
            </div>

            <main className="main-container">
                {<button className="random-button" onClick={event => {
                    event.preventDefault()
                    handleRandomButton()
                }}>Random Chuck</button>}

                <section className="categories">
                    <Categories categories={categories} searchCategory={handleSearchCategories} />
                </section>

                {printItem === 'printCategory' && <>
                    <section className="results">
                        <h2>Jokes</h2>
                        <RetrieveCategories arrayJokes={jokes} />
                    </section>
                </>}

                {printItem === 'printRandom' && <>
                    <section className="results">
                        <h2>Your Random Chuck</h2>
                        <RetrieveRandom arrayRandom={random} />
                    </section>
                </>}
            </main>



        </>
    }

}