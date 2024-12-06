{
    'name': 'Contact Follow-up',
    'version': '17.0.1.0.0',
    'depends': ['base', 'contacts'],
    'description': """
        Add follow-up functionality to contacts with visual indicators.
    """,
    'data': [
        'views/res_partner_views.xml',
        'views/sale_order_views.xml'
    ],
    'assets': {
        'web.assets_backend': [
            'contact_followup_button/static/src/js/followup_button.js',
            'contact_followup_button/static/src/xml/followup_button.xml'
        ],
    },
    'installable': True,
    'application': False,
}