describe('Kitchen Sink', () => {
  it('cy.should - assert that <title> is correct', () => {
    cy.visit('http://localhost:8080');

    cy.title().should('be', 'SoundRedux')
  })

  context('Navigation ', () => {
    before(() => {
      cy.visit('http://localhost:8080');
    });

    context('Genre navigation', () => {
      it('should query songs when navigating to a genre', () => {
        cy.get('.toolbar-genre:not(.active)')
          .first()
          .click()
          .then(el => {
            cy.location('href').should('match', new RegExp(el.text(), 'i'));
          });
      });
      it('should show songs', () => {
        cy.get('.content .song-card')
          .should('be.visible')
          .its('length').should('be.gt', 2);
      });
    });

    context('Main navigation', () => {
      it('logo should show homepage', () => {
        cy.get('.nav-nav-item-link.active')
          .click()
          .then(el => {
            cy.location('href').should('match', /songs/);
          });
      });
      it('should show songs', () => {
        cy.get('.content .song-card')
          .should('be.visible')
          .its('length').should('be.gt', 2);
      });
    });

    context('Search navigation', () => {
      it('enter text', () => {
        cy.get('.nav-search-input')
          .clear()
          .type('boom{enter}')
          .then(el => {
            cy.location('href').should('match', /boom/);
          });
      });
      it('should show songs', () => {
        cy.get('.content .song-card')
          .should('be.visible')
          .its('length').should('be.gt', 2);
      });
    });
  });

  context('Playing music ', () => {
    before(() => {
      cy.visit('http://localhost:8080');
    });

    it('should show player when playing a song', () => {
      cy.get('.toggle-play-button')
        .first()
        .click();

      cy.get('.player').should('be.visible');
    });
    it('should toggle pause / play button', () => {
      cy.get('.ion-ios-pause')
        .should('be.visible')
        .click();

      cy.get('.ion-ios-play')
        .should('be.visible')
    });
  });

  context('View details', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080');
    });

    it('should show user details', () => {
      cy.get('.song-card-user-username')
        .first()
        .click()
        .then(el => {
          cy.get('.user-username').invoke('text').should('match', new RegExp(el.text(), 'i'))
        });
    });

    it('should show song details', () => {
      cy.get('.song-card-title')
        .first()
        .click()
        .then(el => {
          cy.get('.song-title').invoke('text').should('match', new RegExp(el.text(), 'i'))
        });
    });
  });
});
