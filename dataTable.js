document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('myTables');
    const tbody = table.tBodies[0];
    const headers = table.getElementsByTagName('th');
    let rows = Array.from(tbody.getElementsByTagName('tr'));
    let currentPage = 1;
    let recordsPerPage = parseInt(document.querySelector('select[name="myTable_length"]').value);

    const updateTableDisplay = () => {
        const startIndex = (currentPage - 1) * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;

        rows.forEach((row, index) => {
            row.style.display = (index >= startIndex && index < endIndex) ? '' : 'none';
        });

        document.getElementById('CountingPage').textContent = `${startIndex + 1} - ${Math.min(endIndex, rows.length)}`;
        document.getElementById('CountingFoot').textContent = `${startIndex + 1} - ${Math.min(endIndex, rows.length)}`;
    };

    const sortTable = (columnIndex) => {
        const currentSortOrder = table.getAttribute('data-sort-order');
        const compare = (rowA, rowB) => {
            const cellA = rowA.getElementsByTagName('td')[columnIndex].innerText.trim();
            const cellB = rowB.getElementsByTagName('td')[columnIndex].innerText.trim();

            // Handle empty cells
            if (cellA === '' && cellB !== '') return 1;
            if (cellA !== '' && cellB === '') return -1;
            if (cellA === '' && cellB === '') return 0;

            // Compare numbers
            const isNumber = !isNaN(cellA) && !isNaN(cellB);
            if (isNumber) return parseFloat(cellA) - parseFloat(cellB);

            // Compare dates
            const dateA = new Date(cellA);
            const dateB = new Date(cellB);
            if (!isNaN(dateA) && !isNaN(dateB)) return dateA - dateB;

            // Compare text
            return cellA.localeCompare(cellB);
        };

        rows.sort(compare);

        if (currentSortOrder === 'asc') {
            table.setAttribute('data-sort-order', 'desc');
        } else {
            rows.reverse();
            table.setAttribute('data-sort-order', 'asc');
        }

        rows.forEach(row => tbody.appendChild(row));

        for (let i = 0; i < headers.length; i++) {
            const arrow = headers[i].getElementsByClassName('sort-arrow')[0];
            if (i === columnIndex) {
                if (currentSortOrder === 'asc') {
                    arrow.classList.remove('asc');
                    arrow.classList.add('desc');
                } else {
                    arrow.classList.remove('desc');
                    arrow.classList.add('asc');
                }
            } else {
                arrow.classList.remove('asc', 'desc');
            }
        }

        updateTableDisplay();
    };

    document.querySelector('select[name="myTable_length"]').addEventListener('change', (e) => {
        recordsPerPage = parseInt(e.target.value);
        currentPage = 1;
        updateTableDisplay();
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateTableDisplay();
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentPage < Math.ceil(rows.length / recordsPerPage)) {
            currentPage++;
            updateTableDisplay();
        }
    });

    Array.from(headers).forEach((header, index) => {
        header.addEventListener('click', () => sortTable(index));
    });

    updateTableDisplay();
});
