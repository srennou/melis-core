<?php

return [
    'plugins' => [
        'MelisCoreGdprAutoDelete' => [
            'tools' => [
                'melis_core_gdpr_auto_delete' => [
                    'forms' => [
                        // <editor-fold desc="GDPR Auto delete config filtersform">
                        'melisgdprautodelete_add_edit_config_filters' => [
                            'attributes' => array(
                                'name' => 'melisgdprautodelete_add_edit_config_filters',
                                'id' => 'id_melisgdprautodelete_add_edit_config_filters',
                                'method' => 'POST',
                                'action' => '',
                            ),
                            'hydrator' => 'Zend\Stdlib\Hydrator\ArraySerializable',
                            'elements' => [
                                [
                                    'spec' => [
                                        'name' => 'module_filter',
                                        'type' => "select",
                                        'options' => [
                                            'empty_option' => 'Choose module',
                                        ]
                                    ]
                                ]
                            ]
                        ],
                        // </editor-fold>
                        // <editor-fold desc="GDPR Auto delete email setup form">
                        'melisgdprautodelete_add_edit_email_setup' => [
                            'attributes' => array(
                                'name' => 'melisgdprautodelete_add_edit_email_setup',
                                'id' => 'id_melisgdprautodelete_add_edit_email_setup',
                                'method' => 'POST',
                                'action' => '',
                                'entype' => 'multipart/form'
                            ),
                            'hydrator' => 'Zend\Stdlib\Hydrator\ArraySerializable',
                            'elements' => [
                                [
                                    'spec' => [
                                        'name' => 'mgdprc_email_conf_from_name',
                                        'type' => "MelisText",
                                        'options' => [
                                            'label' => 'Sender name',
                                            'tooltip' => 'Name of the sender',
                                        ],
                                        'attributes' => [
                                            'placeholder' => 'Melis technology',
                                            'required' => 'true'
                                        ]
                                    ]
                                ],
                                [
                                    'spec' => [
                                        'name' => 'mgdprc_email_conf_from_email',
                                        'type' => "Email",
                                        'options' => [
                                            'label' => 'Sender email (From)',
                                            'tooltip' => 'Email of the sender (from)',
                                        ],
                                        'attributes' => [
                                            'placeholder' => 'noreply@melistechnology.com',
                                            'required' => 'true',
                                            'class' => 'form-control'
                                        ]
                                    ]
                                ],
                                [
                                    'spec' => [
                                        'name' => 'mgdprc_email_conf_reply_to',
                                        'type' => "Email",
                                        'options' => [
                                            'label' => 'Reply to',
                                            'tooltip' => 'Reply to',
                                        ],
                                        'attributes' => [
                                            'placeholder' => 'noreply@melistechnology.com',
                                            'class' => 'form-control'
                                        ]
                                    ]
                                ],
                                [
                                    'spec' => [
                                        'name' => 'replacement_tags_accepted',
                                        'type' => "text",
                                        'options' => [
                                            'tooltip' => 'Tags',
                                        ],
                                        'attributes' => [
                                            'required' => 'true',
                                            'class' => 'melis-multi-val-input',
                                            'data-label-text' => 'Replacement tags accepted',
                                        ]
                                    ]
                                ],
                                [
                                    'spec' => [
                                        'name' => 'mgdprc_email_conf_layout',
                                        'type' => "MelisText",
                                        'options' => [
                                            'label' => 'Layout',
                                            'tooltip' => 'Layout of the email',
                                        ],
                                        'attributes' => [
                                            'placeholder' => 'melis-core/view/layout/layoutEmail.phtml',
                                        ]
                                    ]
                                ],
                                [
                                    'spec' => [
                                        'name' => 'mgdprc_email_conf_layout_title',
                                        'type' => "MelisText",
                                        'options' => [
                                            'label' => 'Layout title',
                                            'tooltip' => 'Title of the email layout',
                                        ],
                                        'attributes' => [
                                            'placeholder' => 'Melis Technology',
                                        ]
                                    ]
                                ],
                                [
                                    'spec' => [
                                        'name' => 'mgdprc_email_conf_layout_logo',
                                        'type' => "file",
                                        'options' => [
                                            'label' => 'Logo',
                                            'tooltip' => 'Logo of the email',
                                            'filestyle_options' => [
                                                'buttonBefore' => true,
                                                'buttonText' => 'Choose',
                                            ]
                                        ],
                                        'attributes' => [
                                            'placeholder' => 'logo',
                                        ]
                                    ]
                                ],
                                [
                                    'spec' => [
                                        'name' => 'mgdprc_email_conf_layout_desc',
                                        'type' => "MelisCoreTinyMCE",
                                        'options' => [
                                            'label' => 'Layout information',
                                            'tooltip' => 'Email body',
                                        ]
                                    ]
                                ]
                            ]
                        ],
                        // </editor-fold>
                        // <editor-fold desc="GDPR Add edit cron config form">
                        'melisgdprautodelete_add_edit_cron_config_form' => [
                            'attributes' => array(
                                'name' => 'melisgdprautodelete_add_edit_cron_config_form',
                                'id' => 'id_melisgdprautodelete_add_edit_cron_config_form',
                                'method' => 'POST',
                                'action' => '',
                            ),
                            'hydrator' => 'Zend\Stdlib\Hydrator\ArraySerializable',
                            'elements' => [
                                [
                                    'spec' => [
                                        'name' => 'mgdprc_alert_email_status',
                                        'type' => "checkbox",
                                        'options' => [
                                            'label' => 'Activate email warning',
                                            'switch_options' => [
                                                'label-on' => 'Yes',
                                                'label-off' => 'No',
                                                'icon' => "glyphicon glyphicon-resize-horizontal",
                                            ],
                                            'checked_value' => 1,
                                            'unchecked_value' => 0,
                                        ],
                                        'attributes' => [
                                            'placeholder' => '365',
                                            'required' => 'true',
                                            'class' => 'form-control'
                                        ]
                                    ]
                                ],
                                [
                                    'spec' => [
                                        'name' => 'mgdprc_alert_email_days',
                                        'type' => "MelisText",
                                        'options' => [
                                            'label' => 'Alert email sent after inactivity of:'
                                        ],
                                        'attributes' => [
                                            'class' => 'mgdprc_alert_email_days form-control'
                                        ]
                                    ]
                                ],
                                [
                                    'spec' => [
                                        'name' => 'mgdprc_alert_email_resend',
                                        'type' => "checkbox",
                                        'options' => [
                                            'label' => 'Resend alert 7 days before deadline:',
                                            'switch_options' => [
                                                'label-on' => 'Yes',
                                                'label-off' => 'No',
                                                'icon' => "glyphicon glyphicon-resize-horizontal",
                                            ]
                                        ]
                                    ]
                                ],
                                [
                                    'spec' => [
                                        'name' => 'mgdprc_delete_days',
                                        'type' => "MelisText",
                                        'options' => [
                                            'label' => 'Account will be deleted automatically after an inactivity of:'
                                        ],
                                        'attributes' => [
                                            'class' => 'mgdprc_delete_days form-control'
                                        ]
                                    ]
                                ]
                            ]
                        ],
                        // </editor-fold>
                        // <editor-fold desc="GDPR Alert email form">
                        'melisgdprautodelete_add_edit_alert_email' => [
                            'attributes' => array(
                                'name' => 'melisgdprautodelete_add_edit_cron_config_form',
                                'id' => 'id_melisgdprautodelete_add_edit_cron_config_form',
                                'method' => 'POST',
                                'action' => '',
                            ),
                            'hydrator' => 'Zend\Stdlib\Hydrator\ArraySerializable',
                            'elements' => [
                                [
                                    'spec' => [
                                        'name' => 'replacement_tags_accepted',
                                        'type' => "text",
                                        'options' => [
                                            'tooltip' => 'Tags',
                                        ],
                                        'attributes' => [
                                            'required' => 'true',
                                            'class' => 'melis-multi-val-input',
                                            'data-label-text' => 'Replacement tags accepted',
                                        ]
                                    ],
                                ],
                                [
                                    'spec' => [
                                        'name' => 'mgdprc_subject ',
                                        'type' => "text",
                                        'options' => [
                                            'label' => 'Subject',
                                            'tooltip' => 'Subject of the email',
                                        ],
                                        'attributes' => [
                                            'required' => 'true',
                                            'class' => 'form-control'
                                        ]
                                    ],
                                ],
                                [
                                    'spec' => [
                                        'name' => 'mgdprc_html',
                                        'type' => "MelisCoreTinyMCE",
                                        'options' => [
                                            'label' => 'Message',
                                            'tooltip' => 'Message of the email',
                                        ],
                                        'attributes' => [
                                            'required' => 'true',
                                            'class' => 'form-control'
                                        ]
                                    ],
                                ],
                                [
                                    'spec' => [
                                        'name' => 'mgdprc_text',
                                        'type' => "textarea",
                                        'options' => [
                                            'label' => 'Text Version',
                                            'tooltip' => 'Message of the email in text version',
                                        ],
                                        'attributes' => [
                                            'required' => 'true',
                                            'class' => 'form-control'
                                        ]
                                    ],
                                ],
                            ]
                        ]
                        // </editor-fold>
                    ]
                ]
            ]
        ]
    ]
];