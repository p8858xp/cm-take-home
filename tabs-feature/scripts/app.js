document.addEventListener('DOMContentLoaded', async () => {
    const tabsContainer = document.querySelector('.tabs');
    let activeTab = 0;

    const navigationData = await fetchNavigationData();
    renderTabs(navigationData, tabsContainer);

    const tabs = document.querySelectorAll('.tab');
    // set initial underline active position to the first index
    setUnderlinePosition(tabs[activeTab]);
    addTabEventListeners(tabs);
});

window.addEventListener('resize', () => {
    const currentActiveTab = document.querySelector('.tab.active');
    setUnderlinePosition(currentActiveTab);
});

const fetchNavigationData = async () => {
    try {
        const response = await fetch('./assets/navigation.json');
        if (!response.ok) {
            throw new Error('Failed to load navigation data');
        }
        const data = await response.json();
        return data.cities;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const renderTabs = (data, container) => {
    data.forEach((item, index) => {
        const tab = document.createElement('div');
        tab.className = `tab ${index === 0 ? 'active' : ''}`;
        tab.textContent = item.label;
        tab.dataset.index = index;
        container.appendChild(tab);
    });
}

const addTabEventListeners = (tabs) => {
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const currentActiveTab = document.querySelector('.tab.active');
            if (currentActiveTab) {
                currentActiveTab.classList.remove('active');
            }
            this.classList.add('active');
            setUnderlinePosition(this);
        });
    });
}

const setUnderlinePosition = (tab) => {
    if (!tab) return;
    const { offsetLeft, offsetWidth } = tab;
    const tabsContainer = document.querySelector('.tabs-container');

    tabsContainer.style.setProperty('--underline-left', `${offsetLeft}px`);
    tabsContainer.style.setProperty('--underline-width', `${offsetWidth}px`);
}