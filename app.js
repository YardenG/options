// Team Selector Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
    const teamSelector = document.getElementById('teamSelector');
    const teamDropdown = document.getElementById('teamDropdown');
    const dropdownOptions = document.querySelectorAll('.dropdown-option');

    // Toggle dropdown on selector click
    if (teamSelector) {
        teamSelector.addEventListener('click', function(e) {
            e.stopPropagation();
            teamSelector.classList.toggle('active');
            teamDropdown.classList.toggle('show');
        });
    }

    // Handle option selection
    dropdownOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();

            // Remove selected class from all options
            dropdownOptions.forEach(opt => {
                opt.classList.remove('selected');
                const checkIcon = opt.querySelector('.check-icon');
                if (checkIcon) checkIcon.remove();
            });

            // Add selected class to clicked option
            this.classList.add('selected');

            // Add check icon to selected option
            const checkIcon = document.createElement('span');
            checkIcon.className = 'check-icon';
            checkIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
            this.appendChild(checkIcon);

            // Update selector display
            const value = this.dataset.value;
            if (value === 'tee-rex') {
                teamSelector.innerHTML = `
                    <span class="star-icon filled"><i class="fa-solid fa-star"></i></span>
                    <span class="item-name">Tee Rex</span>
                    <span class="item-badge purple">Your data</span>
                    <i class="fa-solid fa-chevron-down"></i>
                `;
            } else if (value === 'team') {
                teamSelector.innerHTML = `
                    <span class="team-icon"><i class="fa-solid fa-users"></i></span>
                    <span class="item-name">Your team</span>
                    <span class="item-badge gray">6 Members</span>
                    <i class="fa-solid fa-chevron-down"></i>
                `;
            }

            // Close dropdown
            teamDropdown.classList.remove('show');
            teamSelector.classList.remove('active');

            // Trigger visual feedback
            teamSelector.style.borderColor = '#7C3AED';
            setTimeout(() => {
                teamSelector.style.borderColor = '';
            }, 300);
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (teamDropdown && !teamDropdown.contains(e.target) && !teamSelector.contains(e.target)) {
            teamDropdown.classList.remove('show');
            teamSelector.classList.remove('active');
        }
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

    if (searchDealsInput) {
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
    }

    // Sort functionality
    const sortBtn = document.querySelector('.sort-btn');
    let sortAscending = true;

    if (sortBtn) {
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

            // Visual feedback
            this.style.color = '#7C3AED';
            setTimeout(() => {
                this.style.color = '';
            }, 300);
        });
    }

    // Row click interaction
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            const dealName = this.querySelector('.deal-name');
            if (dealName) {
                // Visual feedback on row click
                this.style.backgroundColor = '#EDE9FE';
                setTimeout(() => {
                    this.style.backgroundColor = '';
                }, 200);
            }
        });
    });

    // Prototype dropdown toggle
    const prototypeDropdown = document.getElementById('prototypeDropdown');
    if (prototypeDropdown) {
        let isTeamSelected = false;
        prototypeDropdown.addEventListener('click', function() {
            isTeamSelected = !isTeamSelected;
            if (isTeamSelected) {
                this.innerHTML = `
                    <span class="team-icon"><i class="fa-solid fa-users"></i></span>
                    <span class="item-name">Your team</span>
                    <span class="item-badge gray">6 Members</span>
                    <span class="chevron-icon"><i class="fa-solid fa-chevron-down"></i></span>
                `;
            } else {
                this.innerHTML = `
                    <span class="star-icon filled"><i class="fa-solid fa-star"></i></span>
                    <span class="item-name">Tee Rex</span>
                    <span class="item-badge purple">Your data</span>
                    <span class="chevron-icon"><i class="fa-solid fa-chevron-down"></i></span>
                `;
            }
        });
    }

    // Keyboard navigation for dropdown
    document.addEventListener('keydown', function(e) {
        if (teamDropdown && teamDropdown.classList.contains('show')) {
            if (e.key === 'Escape') {
                teamDropdown.classList.remove('show');
                teamSelector.classList.remove('active');
            }
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const options = Array.from(dropdownOptions);
                const currentIndex = options.findIndex(opt => opt.classList.contains('selected'));
                let nextIndex;
                if (e.key === 'ArrowDown') {
                    nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
                } else {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
                }
                options[nextIndex].click();
            }
        }
    });

    // Stats animation on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        card.style.transition = `all 0.3s ease-out ${index * 0.1}s`;
        animateOnScroll.observe(card);
    });

    // Filter button interaction
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            this.style.backgroundColor = '#E5E7EB';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 150);
        });
    }

    // Share button interaction
    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            this.style.color = '#10B981';
            setTimeout(() => {
                this.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> Share';
                this.style.color = '';
            }, 1500);
        });
    }
});
