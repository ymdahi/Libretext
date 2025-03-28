/**
 * libreNavButtons.js
 *
 * @file Adds quick, backwards-forwards navigation buttons to LibreTexts library pages.
 * @author LibreTexts
 */

/**
 * Instantiates navigation buttons and adds them to the DOM, if applicable.
 */
function libreNavButtons() {
  if (window !== window.top) {
    // don't show in iFrame
    return;
  }

  if (
    (
      $('#pageTagsHolder').text().includes('"article:topic"')
      || $('#pageTagsHolder').text().includes('"article:topic-guide"')
    )
    && !window.location.pathname.includes('OER_Remixer')
  ) {
    let displayPrev = true;
    let displayNext = true;

    const prevArticle = $('a.mt-icon-previous-article').first();
    const nextArticle = $('a.mt-icon-next-article').first();

    const prevPage = prevArticle.attr('href');
    const nextPage = nextArticle.attr('href');

    // Attempt to disable navigation button(s) if they lead outside of the current LibreText
    try {
      const breadCrumbs = $('ol.mt-breadcrumbs').first();
      const breadCrumbsList = breadCrumbs.find('li');
      if (breadCrumbsList.length >= 4) {
        const bookCrumb = breadCrumbsList.get(3);
        if (bookCrumb) {
          const bookHref = $(bookCrumb).find('a').first().attr('href');
          if (bookHref) {
            displayPrev = prevPage.includes(bookHref);
            displayNext = nextPage.includes(bookHref);
          }
        }
      }
    } catch (e) {
      console.log('[ERROR] LibreNavButtons: ', e.message);
    }

    const prevPageTitle = prevArticle.attr('title');
    const nextPageTitle = nextArticle.attr('title');

    const backButton = document.createElement('a');
    const backTitle = document.createElement('div');
    const backTitleText = document.createElement('span');
    const nextButton = document.createElement('a');
    const nextTitle = document.createElement('div');
    const nextTitleText = document.createElement('span');

    if (displayPrev) {
      backButton.href = prevPage;
      backButton.setAttribute('id', 'backButton');
      backButton.className = 'libreNavBtn';
      backButton.setAttribute('aria-label', prevPageTitle);

      backTitle.setAttribute('id', 'backTitle');
      backTitle.className = 'libreNavTitle';

      backTitleText.setAttribute('id', 'backTitleText');
      backTitleText.className = 'libreNavText';
      backTitleText.innerText = prevPageTitle;

      $(backButton).html('<i id="backButtonIcon" class="libreNavIcon fa fa-arrow-left"></i>');

      $(backTitle).append(backTitleText);

      $(backButton).hover(() => {
        $(backTitle).css('display', 'flex').fadeIn(200);
      }, () => {
        $(backTitle).css('display', 'none').fadeOut(200);
      });
      document.body.append(backButton);
      document.body.append(backTitle);
    }

    if (displayNext) {
      nextButton.href = nextPage;
      nextButton.setAttribute('id', 'nextButton');
      nextButton.className = 'libreNavBtn';
      nextButton.setAttribute('aria-label', nextPageTitle);

      nextTitle.setAttribute('id', 'nextTitle');
      nextTitle.className = 'libreNavTitle';

      nextTitleText.setAttribute('id', 'nextTitleText');
      nextTitleText.className = 'libreNavText';
      nextTitleText.innerText = nextPageTitle;

      $(nextButton).html('<i id="nextButtonIcon" class="libreNavIcon fa fa-arrow-right"></i>');

      $(nextTitle).append(nextTitleText);

      $(nextButton).hover(() => {
        $(nextTitle).css('display', 'flex').fadeIn(200);
      }, () => {
        $(nextTitle).css('display', 'none').fadeOut(200);
      });
      document.body.append(nextButton);
      document.body.append(nextTitle);
    }
  }
}

window.addEventListener('load', libreNavButtons);
