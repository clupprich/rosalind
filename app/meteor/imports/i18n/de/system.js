export const system = {
  this: 'System',
  thisSettings: 'Einstellungen',
  thisMessages: 'Messages',
  thisImporters: 'Importers',
  thisJobs: 'Background Jobs',
  thisStats: 'Stats',
  thisCalendars: 'Kalender',
  thisConstraints: 'Termin-Regeln',
  thisClients: 'Clients',
  thisTags: 'Tags',
  thisMediaTags: 'Kategorien für Medien',
  thisInboundCallsTopics: 'Rückruflisten',
  thisEvents: 'Ereignisse',
  thisNative: 'Arbeitsplatz',
  thisReferrables: 'Empfehlungen',
  thisTemplates: 'Vorlagen',
  missingConsents: 'Fehlende Reverse',
  events: {
    'appointments/insert': 'hat einen Termin ausgemacht',
    'appointments/acquireLock': 'hat einen Termin vorübergehend reserviert',
    'appointments/releaseLock': 'hat eine vorübergehende Terminreservierung aufgehoben',
    'appointments/setAdmitted': 'hat einen Termin als \'anwesend\' markiert',
    'appointments/setCanceled': 'hat einen Termin als \'abgesagt\' markiert',
    'appointments/softRemove': 'hat einen Termin gelöscht',
    'inboundCalls/post': 'hat einen eingehenden Anruf als erledigt markiert',
    'inboundCalls/resolve': 'hat einen eingehenden Anruf als erledigt markiert',
    'comments/post': 'hat eine Anmerkung hinzugefügt',
    'patients/insert': 'hat eine neue PatientIn angelegt',
    'patients/update': 'hat eine bestehende PatientIn bearbeitet',
    'reports/upsert': 'hat einen Bericht aktualisiert',
    'reports/insert': 'hat einen Bericht erstellt',
    'reports/sendEmail': 'Bericht wurde per Email versandt',
    'users/login': 'hat sich eingeloggt',
    'users/logout': 'hat sich ausgeloggt',
    'users/loginFailed': 'Login fehlgeschlagen',
    'users/create': 'hat einen neuen Benutzer angelegt',
    'users/updateRoles': 'hat die Berechtingungen von __subject__ geändert',
    'users/updatePassword': 'hat das Passwort von __subject__ geändert',
    'timesheets/startTracking': 'hat die Zeiterfassung gestartet',
    'timesheets/stopTracking': 'hat die Zeiterfassung gestoppt'
  }
}
