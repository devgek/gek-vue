// Ready translated locale messages
const myMessages = {
  de: {
    $vuetify: {
      dataTable: {
        itemsPerPageText: "Zeilen pro Seite:",
        ariaLabel: {
          sortDescending: "Absteigend sortiert.",
          sortAscending: "Aufsteigend sortiert.",
          sortNone: "Nicht sortiert.",
          activateNone: "Aktivieren um Sortierung zu entfernen.",
          activateDescending: "Aktivieren um absteigend zu sortieren.",
          activateAscending: "Aktivieren um aufsteigend zu sortieren.",
        },
        sortBy: "Sortiere nach",
      },
      dataFooter: {
        itemsPerPageText: "Elemente pro Seite:",
        itemsPerPageAll: "Alle",
        nextPage: "Nächste Seite",
        prevPage: "Vorherige Seite",
        firstPage: "Erste Seite",
        lastPage: "Letzte Seite",
        pageText: "{0}-{1} von {2}",
      },
      datePicker: {
        itemsSelected: "{0} ausgewählt",
        nextMonthAriaLabel: "Nächsten Monat",
        nextYearAriaLabel: "Nächstes Jahr",
        prevMonthAriaLabel: "Vorheriger Monat",
        prevYearAriaLabel: "Vorheriges Jahr",
      },
      noDataText: "Keine Daten vorhanden",
    },
    app: {
      title: "GekVue Scaffold App",
      user: {
        menuHeader: "Aktionen",
      },
    },
    entity: {
      desc: {
        user: "Benutzer",
        contact: "Kontakt",
      },
    },
    msg: {
      entity: {
        success: {
          create: "{entityDesc} wurde angelegt",
          update: "{entityDesc} wurde geändert",
          delete: "{entityDesc} wurde gelöscht",
        },
        error: {
          create: "{entityDesc} konnte nicht angelegt werden",
          update: "{entityDesc} konnte nicht geändert werden",
          delete: "{entityDesc} konnte nicht gelöscht werden",
        },
      },
    },
    nav: {
      pages: {
        header: "Benutzerfunktionen",
        page1: "Seite 1",
      },
      admin: {
        header: "Administration",
        user: "Benutzer",
        contact: "Kontakt",
      },
      logout: "Abmelden",
    },
    form: {
      all: {
        label: {
          actions: "Aktionen",
        },
        btn: {
          back: "Zurück",
          abort: "Abbrechen",
          save: "Speichern",
          delete: "Löschen",
        },
      },
      login: {
        header: "Bitte anmelden",
        label: {
          user: "Benutzer",
          password: "Passwort",
        },
        button: {
          login: "Anmelden",
        },
        msg: {
          inputrequired: "Username und Passwort müssen angegeben werden.",
        },
      },
      page1: {
        header: "Seite 1",
        content: "Das ist der Inhalt von Seite 1",
        labelContacttype: "Kontakttyp:",
        labelUser: "Benutzer:",
      },
      user: {
        list: {
          header: "Benutzer",
          buttonnew: "Neuer Benutzer",
        },
        edit: {
          header: "Benutzer bearbeiten",
          headernew: "Benutzer neu anlegen",
          label: {
            name: "Name:",
            pass: "Passwort:",
            email: "Email:",
            role: "Benutzerrolle:",
            customer: "Anzeige Energiedaten:",
          },
        },
      },
      contact: {
        list: {
          header: "Kontakt",
          buttonnew: "Neuer Kontakt",
          orgtype: "Typ",
          name: "Name",
          nameext: "Namenszusatz",
          contacttype: "Kontakttyp",
          id: "Id",
        },
        edit: {
          header: "Kontakt bearbeiten",
          headernew: "Kontakt neu anlegen",
          label: {
            orgtype: "Organisationstyp:",
            name: "Name:",
            nameext: "Namenszusatz:",
            contacttype: "Kontakttyp:",
            id: "Id:",
          },
        },
      },
      contactaddress: {
        list: {
          header: "Kontaktadresse",
          buttonnew: "Neue Kontaktadresse",
          street: "Straße",
          streetnr: "Nr",
          steetext: "Zusatz",
          plz: "Plz",
          city: "Ort",
        },
        edit: {
          header: "Kontaktadresse bearbeiten",
          headernew: "Kontaktadresse neu anlegen",
          label: {
            orgtype: "Organisationstyp:",
            name: "Name:",
            nameext: "Namenszusatz:",
            contacttype: "Kontakttyp:",
            id: "Id:",
          },
        },
      },
    },
  },
};

export default myMessages