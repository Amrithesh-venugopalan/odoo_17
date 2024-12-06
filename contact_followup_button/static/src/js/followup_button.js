/** @odoo-module **/
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { usePopover } from "@web/core/popover/popover_hook";
import { Component,onMounted } from "@odoo/owl";
export class followupPopoverContent extends Component {
    setup() {
        this.actionService = useService("action");
        this.orm = useService("orm");
    }
}
followupPopoverContent.template = "contact_followup_button.FollowupPopoverContent";
export class followupPopoverWidget extends Component {
    setup() {
        this.actionService = useService("action");
        this.orm = useService("orm");
        this.popover = usePopover(this.constructor.components.Popover, { position: "top" });
    }
    showPopup(ev) {
        this.popover.open(ev.currentTarget, {
            record: this.props.record,
        });
    }
    closePopup(ev){
        this.popover.close(ev.currentTarget);
    }
async updateFollowupDate(ev) {
    ev.currentTarget.classList.remove('btn-primary');
    ev.currentTarget.classList.add('btn-secondary');
    const today = new Date();
    const offset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(today.getTime() + offset);
    const formattedDateTime = istTime
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
    this.props.record.data.last_followup_date = formattedDateTime;
    const partnerId = this.props.record.evalContext.id;
    var viewID = await this.orm.call("res.partner", "get_view_id", [[]], {xml_id: "contact_followup_button.sale_order_tree_custom"});
    this.orm.write("res.partner", [partnerId], {
        last_followup_date: formattedDateTime,
    }).then(()=>{
            this.actionService.doAction({
            name: "Sale Orders for Partner",
            type: "ir.actions.act_window",
            res_model: "sale.order",
            views: [[viewID, "tree"], [false, "form"]],
            domain: [["partner_id", "=", partnerId]],
            target: "current",
        })
    })
}
}
followupPopoverWidget.components = { Popover: followupPopoverContent };
followupPopoverWidget.template = "contact_followup_button.FollowupPopoverWidget";
export const FollowupPopoverWidget = {
    component: followupPopoverWidget,
};
registry.category("view_widgets").add("followup_contact_widget", FollowupPopoverWidget);
