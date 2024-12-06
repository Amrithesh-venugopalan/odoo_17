from odoo import models, fields

class ResPartner(models.Model):
    _inherit = 'res.partner'

    last_followup_date = fields.Char(
        string='Last Follow-up',
        readonly=True,
        help="Date when the last follow-up was done"
    )

    def get_view_id(self,xml_id):
        return self.env.ref(xml_id).id


