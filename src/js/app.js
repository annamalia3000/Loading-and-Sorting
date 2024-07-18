import data from '../movie-list/movie-list.json';

const tableBody = document.querySelector('.table-body');

let sortOrder = [
    { 
        field: 'id', 
        order: 'asc' 
    },
    { 
        field: 'id', 
        order: 'desc' 
    },
    { 
        field: 'title', 
        order: 'asc' 
    },
    { 
        field: 'title', 
        order: 'desc' 
    },
    { 
        field: 'year', 
        order: 'asc' 
    },
    { 
        field: 'year', 
        order: 'desc' 
    },
    { 
        field: 'imdb', 
        order: 'asc' 
    },
    { 
        field: 'imdb', 
        order: 'desc' 
    }
];

let currentSortIndex = 0;

function createTable(data) {
    tableBody.innerHTML = '';

    data.forEach(movie => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', movie.id);
        row.setAttribute('data-title', movie.title);
        row.setAttribute('data-year', movie.year);         
        row.setAttribute('data-imdb', movie.imdb.toFixed(2));

        row.innerHTML = `
               <td>#${movie.id}</td>
               <td>${movie.title}</td>
               <td>(${movie.year})</td>
               <td>imdb: ${movie.imdb.toFixed(2)}</td>
            `;

        tableBody.appendChild(row);
    });
}

function sortData(field, order) {
    const rows = [ ...tableBody.querySelectorAll('tr') ];

    rows.sort((a, b) => {
        const aValue = a.getAttribute(`data-${field}`);
        const bValue = b.getAttribute(`data-${field}`);

        if(field === 'title') {
            return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else {
            return order === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });
    
    rows.forEach(row => tableBody.appendChild(row));
}

function changeSortOrder() {
    const { field, order } = sortOrder[currentSortIndex];
    sortData(field, order);
    currentSortIndex = (currentSortIndex + 1) % 8;
}

document.addEventListener('DOMContentLoaded', () => {
    createTable(data);
    changeSortOrder();
    setInterval(changeSortOrder, 2000);
});