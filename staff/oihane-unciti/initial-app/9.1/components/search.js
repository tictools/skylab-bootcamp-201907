'use strict';

/**
 * Search abstraction.
 * 
 * @param {HTMLElement} container 
 */

class Search extends Component{
    constructor(container){
        super(container)
        
    }
    onSearch(expression){
        var form = this.container.getElementsByTagName('form')[0];
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            var query = form.query.value;

            expression(query);
        })
    }
}
