/*
USAGE:
{{confirm-modal
cancelButtonText: 'Cancel'
okButtonText: 'Ok'
cancelAction: 'cancel'
okAction: 'ok'
titleUseHTML: false
title: 'Confirm'
messageUseHTML: true
message: '<p>I take can HTML for my message because I\'m soooo special...</p>'
}}
 */

import Em from 'ember';
var $ = Em.$;
export default Em.Component.extend({
    cancelIconClass: 'fa fa-thumbs-o-down',
    okIconClass: 'fa fa-thumbs-o-up',
    closeIconClass: 'fa fa-times-circle-o',
    hasCancel: true,
    cancelButtonText: 'Cancel',
    okButtonText: 'Ok',
    titleUseHTML: false,
    messageUseHTML: true,
    title: 'Confirm',
    cancelAction: null,
    willShowAction: null,
    willHideAction: null,
    didShowAction: null,
    didHideAction: null,
    okAction: null,
    message: '<p>Press \'Ok\' to continue, or \'Cancel\' to cancel.</p>',
    modalId: function(){
        return this.get('elementId')+'-modal';
    }.property('elementId'),
    okButtonId: function(){
        return this.get('modalId')+'-ok';
    }.property('elementId'),
    cancelButtonId: function(){
        return this.get('modalId')+'-cancel';
    }.property('elementId'),
    visible: false,
    visibleChanged: function(){
        var visible = this.get('visible');
        if(visible){
            this.showModal();
        }else{
            this.hideModal();
        }
    }.observes('visible'),
    showModal: function(){
        $('#'+this.get('modalId')).modal('show');
    },
    hideModal: function(){
        $('#'+this.get('modalId')).modal('hide');
    },
    didInsertElement: function(){
        var self = this,
            modal = $('#'+self.get('modalId'));
        modal.on('show.bs.modal', function(){
            Em.Logger.debug('About to show modal...');
            if(self.get('willShowAction') != null){
                self.sendAction('willShowAction');
            }
        });
        modal.on('hide.bs.modal', function(){
            Em.Logger.debug('About to hide modal...');
            if(self.get('willHideAction') != null){
                self.sendAction('willHideAction');
            }
        });
        modal.on('shown.bs.modal', function(){
            Em.Logger.debug('Modal Shown....');
            self.set('visible', true);
            if(self.get('didShowAction') != null){
                self.sendAction('didShowAction');
            }
        });
        modal.on('hidden.bs.modal', function(){
            Em.Logger.debug('Modal Hidden...');
            self.set('visible', false);
            if(self.get('didHideAction') != null){
                self.sendAction('didHideAction');

            }
        });
        $('#'+this.get('cancelButtonId')).on('click', function(){
            Em.Logger.debug('Cancel Clicked!');
            if(self.get('cancelAction') != null){
                self.sendAction('cancelAction');
                $('#'+self.get('modalId')).modal('hide');
            }
        });
        $('#'+this.get('okButtonId')).on('click', function(){
            self.hideModal();
            Em.run.later(function(){
                Em.Logger.debug('Ok Clicked!');
                if(self.get('okAction') != null){
                    self.sendAction('okAction');
                }
            }, 500);
        });
    }
});
