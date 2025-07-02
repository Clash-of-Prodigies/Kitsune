const globalVariable = {
    _variables: {
        'tab': 'all',
        'filter': 'upcoming',
    },
    
    getVariable(variable) {
        return this._variables[variable];
    },
    
    setVariable(variable, val) {
        const valueToSet = val.toLowerCase();

        switch (variable) {
            case "tab":
                const tabElements = document.querySelector('#tabs div').children;
                for (const element of tabElements) {
                    if (element.textContent.toLowerCase() === valueToSet) {
                        element.classList.add('active_tab');
                        this._variables[variable] = valueToSet;
                    } else element.classList.remove('active_tab');
                }
            break;
            
            case "filter":
                const filterElements = document.querySelector('#filter').children;
                for (const element of filterElements) {
                    if (element.textContent.toLowerCase() === valueToSet) {
                        element.classList.add('active_filter');
                        this._variables[variable] = valueToSet;
                    } else element.classList.remove('active_filter');
                }
            break;
        }
    }
};

async function load_data_into_cards() {
    try {
        const sides = await load_data_from_json();

        for (const side in sides) {
            /* Sides should contains left, middle, right */
            let original_card = document.querySelector('#o-card');
            switch (side) {
                case 'left':
                    for (const field of sides[side]) {
                        /* Field contain be {Top competition, items...}, {Rankings, items...} */
                        const card = original_card.cloneNode(true);
                        const title = card.querySelector('.card_title');
                        title.appendChild(document.createElement('span'));
                        title.childNodes[0].textContent = field.title;
                        title.classList.add('left_card_titles');
                        for (const item of field.items) {
                            const container = document.createElement('a'); container.href = item.link;
                            const name_and_logo = document.createElement('div');
                            const image = document.createElement('img'); image.src = item.logo;
                            name_and_logo.appendChild(image);
                            const name = document.createElement('span'); name.textContent = item.name;
                            name_and_logo.appendChild(name);
                            container.appendChild(name_and_logo);
                            const star = document.createElement('i'); star.classList.add('fa');
                            if (item.starred === true) star.classList.add('fa-star');
                            if (item.starred === false) star.classList.add('fa-star-o');
                            if (item.starred !== null) container.appendChild(star);
                            container.classList.add('events')
                            card.querySelector('.card_items').appendChild(container);
                        }
                        card.style.display = 'flex'; card.id = ''; card.classList.add('card');
                        document.querySelector('#cards #left').appendChild(card);
                    }
                    break;
                case 'middle':
                    load_data_into_middle_card(['all', 'upcoming'], sides[side]);
                    break;
            }
        }
    } catch(error) {
        console.log(error);
    }
}

async function load_data_from_json() {
    return fetch('../data.json', {
		    headers: {
                "ngrok-skip-browser-warning": "true",
                "Content-Type": "application/json"
            },
            credentials: "include"
	    }).then(response => response.json());
}

async function load_data_into_middle_card(
    sieve=[globalVariable.getVariable('tab'), globalVariable.getVariable('filter')], data = Object()) {
    if (Object.keys(data).length === 0) data = (await load_data_from_json())['middle'];
    const card = document.querySelector('#o-card').cloneNode(true);
    const title = card.querySelector('.card_title');
    title.append(...document.querySelector('#middle_header').childNodes);
    
    const tabs = Object.keys(data);
    for (const tab of tabs) {
        const new_tab = document.createElement('a');
        new_tab.textContent = tab.charAt(0).toUpperCase() + tab.slice(1);
        title.querySelector('#tabs div').appendChild(new_tab);
    }

    const filters = Object.keys(data[sieve[0]]);
    for (const filter of filters) {
        const new_tab = document.createElement('button');
        new_tab.addEventListener('click', () => {filter_data('filter', filter.toLowerCase());});
        new_tab.textContent = filter.charAt(0).toUpperCase() + filter.slice(1);
        title.querySelector('#filter').appendChild(new_tab);
    }
                    
    competitions = data[sieve[0]][sieve[1]];
    for (const items of competitions) {
        const middle_item_header = document.querySelector('#middle_item_header').cloneNode(true);
        middle_item_header.querySelector('.item_logo img').src = items.logo;
        middle_item_header.querySelector('.item_region').textContent = items.region;
        middle_item_header.querySelector('.item_desc').textContent = items.desc;
        if (items.starred) middle_item_header.querySelector('i').classList.add('fa', 'fa-star');
        if (items.starred === false) middle_item_header.querySelector('i').classList.add('fa', 'fa-star-o');
        
        for (const index in items.matches) {
            match = items.matches[index];
            const match_template = document.querySelector('#match').cloneNode(true);
            
            for (const key in match) {
                if (key === 'starred' || key === 'logos') continue;
                    let temp_array = [];                      
                        
                    for (const val in match[key]) {
                        const temp_div = document.createElement('div');
                        temp_div.textContent = match[key][val];
                        temp_array.push(temp_div);
                    };
                    
                    match_template.querySelector('.'+key).append(...temp_array);
            }
            if (items.starred) match_template.querySelector('i').classList.add('fa', 'fa-star');
            if (items.starred === false) match_template.querySelector('i').classList.add('fa', 'fa-star-o');
            
            match_template.style.display = 'flex';
            match_template.id = '';
            match_template.classList.add('match');
            middle_item_header.appendChild(match_template);
        }
        
        middle_item_header.style.display = 'block';
        middle_item_header.id = '';
        middle_item_header.classList.add('middle_item_header');
        card.appendChild(middle_item_header);
    }

    card.style.display = 'flex';
    card.id = '';
    card.classList.add('card');
    document.querySelector('#cards #middle').appendChild(card);
}

function filter_data(key, value) {
    globalVariable.setVariable(key, value);
    load_data_into_middle_card();
}

document.addEventListener('DOMContentLoaded', function () {
    load_data_into_cards();
});

window.onload = function() {
    globalVariable.setVariable('tab', 'All');

}