// Team Selector Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
    const teamSelector = document.getElementById('teamSelector');
    const teamDropdown = document.getElementById('teamDropdown');
    const dropdownOptions = document.querySelectorAll('.dropdown-option');

    // Toggle dropdown on selector click
    teamSelector.addEventListener('click', function(e) {
        e.stopPropagation();
        teamSelector.classList.toggle('active');
        teamDropdown.classList.toggle('show');
    });

    // Handle option selection
    dropdownOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();

            // Remove selected class from all options
            dropdownOptions.forEach(opt => opt.classList.remove('selected'));

            // Add selected class to clicked option
            this.classList.add('selected');

            // Update selector display
            const value = this.dataset.value;
            if (value === 'tee-rex') {
                teamSelector.innerHTML = `
                    <span class="star-icon filled">&#9733;</span>
                    <span>Tee Rex</span>
                    <span class="item-badge">Your data</span>
                    <span class="chevron">&#8964;</span>
                `;
            } else if (value === 'team') {
                teamSelector.innerHTML = `
                    <span class="team-icon">&#128101;</span>
                    <span>Your team</span>
                    <span class="item-badge gray">6 Members</span>
                    <span class="chevron">&#8964;</span>
                `;
            }

            // Close dropdown
            teamDropdown.classList.remove('show');
            teamSelector.classList.remove('active');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        teamDropdown.classList.remove('show');
        teamSelector.classList.remove('active');
    });

    // Pagination functionality
    const pageButtons = document.querySelectorAll('.page-btn:not(.nav-btn)');
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            pageButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Search deals functionality
    const searchDealsInput = document.querySelector('.search-deals input');
    const tableRows = document.querySelectorAll('.deals-table tbody tr');

    searchDealsInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();

        tableRows.forEach(row => {
            const dealName = row.querySelector('.deal-name');
            if (dealName) {
                const name = dealName.textContent.toLowerCase();
                if (name.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        });
    });

    // Sort functionality (basic demo)
    const sortBtn = document.querySelector('.sort-btn');
    let sortAscending = true;

    sortBtn.addEventListener('click', function() {
        const tbody = document.querySelector('.deals-table tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.sort((a, b) => {
            const nameA = a.querySelector('.deal-name').textContent;
            const nameB = b.querySelector('.deal-name').textContent;
            return sortAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });

        sortAscending = !sortAscending;

        rows.forEach(row => tbody.appendChild(row));
    });

    // Row hover effect for better UX
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });

    // Simulate clicking on a deal row
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            const dealName = this.querySelector('.deal-name').textContent;
            console.log(`Opening deal: ${dealName}`);
            // In a real app, this would navigate to the deal details page
        });
    });

    // Interactive prototype dropdown in preview section
    const prototypeDropdown = document.querySelector('.prototype-dropdown');
    if (prototypeDropdown) {
        prototypeDropdown.addEventListener('click', function() {
            // Toggle between states for demo
            const hasTeam = this.querySelector('.team-icon');
            if (hasTeam) {
                this.innerHTML = `
                    <span class="star-icon filled">&#9733;</span>
                    <span>Tee Rex</span>
                    <span class="item-badge">Your data</span>
                    <span class="chevron">&#8964;</span>
                `;
            } else {
                this.innerHTML = `
                    <span class="team-icon">&#128101;</span>
                    <span>Your team</span>
                    <span class="item-badge gray">6 Members</span>
                    <span class="chevron">&#8964;</span>
                `;
            }
        });
    }

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add animation to stats on scroll
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.3s ease-out';
        observer.observe(card);
    });
});
