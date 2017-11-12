class Radio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coffeeTypes: [
        'Latte',
        'Flat White',
        'Decaf',
        'Long Black',
        'Soy Cap',
        'Mocha'
      ],
      yourPick: ''
    }
  }
  render() {
    const yourPick = this.state.yourPick
    const options = this.state.coffeeTypes.map((loan, key) => {
      const isCurrent = this.state.yourPick === loan
      return (
        
        <div 
          key={key} 
          className="radioPad"
        >
          <div>
            <label 
              className={
                isCurrent ? 
                  'radioPad__wrapper radioPad__wrapper--selected' :
                  'radioPad__wrapper'
                }
            >
              <input
                className="radioPad__radio"
                type="radio" 
                name="coffeeTypes" 
                id={loan} 
                value={loan}
                onChange={this.handleRadio.bind(this)}
              />
              {loan}
            </label>
          </div>
        </div>
      )
    })
    return (
      <div className="container text-center">
        <div className="row">
          <p className="lead">
            <strong>{yourPick}</strong>
            {yourPick ? 
              ', nice pick!' : 'Tap away, friend.'
            }
          </p>
          <hr />
          {options}
        </div>
      </div>
    )
  }
  handleRadio(e) {
    this.setState({ yourPick: e.target.value })
  }
}