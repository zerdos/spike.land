/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Disposable } from '../../../base/common/lifecycle';
import { IBulkEditService } from '../../browser/services/bulkEditService';
import { ICodeEditorService } from '../../browser/services/codeEditorService';
import { IEditorWorkerService } from '../../common/services/editorWorkerService';
import { EditorWorkerServiceImpl } from '../../common/services/editorWorkerServiceImpl';
import { IModeService } from '../../common/services/modeService';
import { ModeServiceImpl } from '../../common/services/modeServiceImpl';
import { IModelService } from '../../common/services/modelService';
import { ModelServiceImpl } from '../../common/services/modelServiceImpl';
import { ITextResourceConfigurationService, ITextResourcePropertiesService } from '../../common/services/textResourceConfigurationService';
import { SimpleBulkEditService, SimpleConfigurationService, SimpleDialogService, SimpleNotificationService, SimpleEditorProgressService, SimpleResourceConfigurationService, SimpleResourcePropertiesService, SimpleUriLabelService, SimpleWorkspaceContextService, StandaloneCommandService, StandaloneKeybindingService, StandaloneTelemetryService, SimpleLayoutService } from './simpleServices';
import { StandaloneCodeEditorServiceImpl } from './standaloneCodeServiceImpl';
import { StandaloneThemeServiceImpl } from './standaloneThemeServiceImpl';
import { IStandaloneThemeService } from '../common/standaloneThemeService';
import { IMenuService } from '../../../platform/actions/common/actions';
import { ICommandService } from '../../../platform/commands/common/commands';
import { IConfigurationService } from '../../../platform/configuration/common/configuration';
import { ContextKeyService } from '../../../platform/contextkey/browser/contextKeyService';
import { IContextKeyService } from '../../../platform/contextkey/common/contextkey';
import { ContextMenuService } from '../../../platform/contextview/browser/contextMenuService';
import { IContextMenuService, IContextViewService } from '../../../platform/contextview/browser/contextView';
import { ContextViewService } from '../../../platform/contextview/browser/contextViewService';
import { IDialogService } from '../../../platform/dialogs/common/dialogs';
import { IInstantiationService, createDecorator } from '../../../platform/instantiation/common/instantiation';
import { InstantiationService } from '../../../platform/instantiation/common/instantiationService';
import { ServiceCollection } from '../../../platform/instantiation/common/serviceCollection';
import { IKeybindingService } from '../../../platform/keybinding/common/keybinding';
import { ILabelService } from '../../../platform/label/common/label';
import { IListService, ListService } from '../../../platform/list/browser/listService';
import { ConsoleLogService, ILogService } from '../../../platform/log/common/log';
import { MarkerService } from '../../../platform/markers/common/markerService';
import { IMarkerService } from '../../../platform/markers/common/markers';
import { INotificationService } from '../../../platform/notification/common/notification';
import { IEditorProgressService } from '../../../platform/progress/common/progress';
import { IStorageService, InMemoryStorageService } from '../../../platform/storage/common/storage';
import { ITelemetryService } from '../../../platform/telemetry/common/telemetry';
import { IThemeService } from '../../../platform/theme/common/themeService';
import { IWorkspaceContextService } from '../../../platform/workspace/common/workspace';
import { MenuService } from '../../../platform/actions/common/menuService';
import { IMarkerDecorationsService } from '../../common/services/markersDecorationService';
import { MarkerDecorationsService } from '../../common/services/markerDecorationsServiceImpl';
import { IAccessibilityService } from '../../../platform/accessibility/common/accessibility';
import { ILayoutService } from '../../../platform/layout/browser/layoutService';
import { getSingletonServiceDescriptors } from '../../../platform/instantiation/common/extensions';
import { AccessibilityService } from '../../../platform/accessibility/common/accessibilityService';
import { IClipboardService } from '../../../platform/clipboard/common/clipboardService';
import { BrowserClipboardService } from '../../../platform/clipboard/browser/clipboardService';
import { IUndoRedoService } from '../../../platform/undoRedo/common/undoRedo';
import { UndoRedoService } from '../../../platform/undoRedo/common/undoRedoService';
import { StandaloneQuickInputServiceImpl } from './quickInput/standaloneQuickInputServiceImpl';
import { IQuickInputService } from '../../../platform/quickinput/common/quickInput';
export var StaticServices;
(function (StaticServices) {
    const _serviceCollection = new ServiceCollection();
    class LazyStaticService {
        constructor(serviceId, factory) {
            this._serviceId = serviceId;
            this._factory = factory;
            this._value = null;
        }
        get id() { return this._serviceId; }
        get(overrides) {
            if (!this._value) {
                if (overrides) {
                    this._value = overrides[this._serviceId.toString()];
                }
                if (!this._value) {
                    this._value = this._factory(overrides);
                }
                if (!this._value) {
                    throw new Error('Service ' + this._serviceId + ' is missing!');
                }
                _serviceCollection.set(this._serviceId, this._value);
            }
            return this._value;
        }
    }
    StaticServices.LazyStaticService = LazyStaticService;
    let _all = [];
    function define(serviceId, factory) {
        let r = new LazyStaticService(serviceId, factory);
        _all.push(r);
        return r;
    }
    function init(overrides) {
        // Create a fresh service collection
        let result = new ServiceCollection();
        // make sure to add all services that use `registerSingleton`
        for (const [id, descriptor] of getSingletonServiceDescriptors()) {
            result.set(id, descriptor);
        }
        // Initialize the service collection with the overrides
        for (let serviceId in overrides) {
            if (overrides.hasOwnProperty(serviceId)) {
                result.set(createDecorator(serviceId), overrides[serviceId]);
            }
        }
        // Make sure the same static services are present in all service collections
        _all.forEach(service => result.set(service.id, service.get(overrides)));
        // Ensure the collection gets the correct instantiation service
        let instantiationService = new InstantiationService(result, true);
        result.set(IInstantiationService, instantiationService);
        return [result, instantiationService];
    }
    StaticServices.init = init;
    StaticServices.instantiationService = define(IInstantiationService, () => new InstantiationService(_serviceCollection, true));
    const configurationServiceImpl = new SimpleConfigurationService();
    StaticServices.configurationService = define(IConfigurationService, () => configurationServiceImpl);
    StaticServices.resourceConfigurationService = define(ITextResourceConfigurationService, () => new SimpleResourceConfigurationService(configurationServiceImpl));
    StaticServices.resourcePropertiesService = define(ITextResourcePropertiesService, () => new SimpleResourcePropertiesService(configurationServiceImpl));
    StaticServices.contextService = define(IWorkspaceContextService, () => new SimpleWorkspaceContextService());
    StaticServices.labelService = define(ILabelService, () => new SimpleUriLabelService());
    StaticServices.telemetryService = define(ITelemetryService, () => new StandaloneTelemetryService());
    StaticServices.dialogService = define(IDialogService, () => new SimpleDialogService());
    StaticServices.notificationService = define(INotificationService, () => new SimpleNotificationService());
    StaticServices.markerService = define(IMarkerService, () => new MarkerService());
    StaticServices.modeService = define(IModeService, (o) => new ModeServiceImpl());
    StaticServices.standaloneThemeService = define(IStandaloneThemeService, () => new StandaloneThemeServiceImpl());
    StaticServices.logService = define(ILogService, () => new ConsoleLogService());
    StaticServices.undoRedoService = define(IUndoRedoService, (o) => new UndoRedoService(StaticServices.dialogService.get(o), StaticServices.notificationService.get(o)));
    StaticServices.modelService = define(IModelService, (o) => new ModelServiceImpl(StaticServices.configurationService.get(o), StaticServices.resourcePropertiesService.get(o), StaticServices.standaloneThemeService.get(o), StaticServices.logService.get(o), StaticServices.undoRedoService.get(o)));
    StaticServices.markerDecorationsService = define(IMarkerDecorationsService, (o) => new MarkerDecorationsService(StaticServices.modelService.get(o), StaticServices.markerService.get(o)));
    StaticServices.codeEditorService = define(ICodeEditorService, (o) => new StandaloneCodeEditorServiceImpl(StaticServices.standaloneThemeService.get(o)));
    StaticServices.editorProgressService = define(IEditorProgressService, () => new SimpleEditorProgressService());
    StaticServices.storageService = define(IStorageService, () => new InMemoryStorageService());
    StaticServices.editorWorkerService = define(IEditorWorkerService, (o) => new EditorWorkerServiceImpl(StaticServices.modelService.get(o), StaticServices.resourceConfigurationService.get(o), StaticServices.logService.get(o)));
})(StaticServices || (StaticServices = {}));
export class DynamicStandaloneServices extends Disposable {
    constructor(domElement, overrides) {
        super();
        const [_serviceCollection, _instantiationService] = StaticServices.init(overrides);
        this._serviceCollection = _serviceCollection;
        this._instantiationService = _instantiationService;
        const configurationService = this.get(IConfigurationService);
        const notificationService = this.get(INotificationService);
        const telemetryService = this.get(ITelemetryService);
        const themeService = this.get(IThemeService);
        const logService = this.get(ILogService);
        let ensure = (serviceId, factory) => {
            let value = null;
            if (overrides) {
                value = overrides[serviceId.toString()];
            }
            if (!value) {
                value = factory();
            }
            this._serviceCollection.set(serviceId, value);
            return value;
        };
        let contextKeyService = ensure(IContextKeyService, () => this._register(new ContextKeyService(configurationService)));
        ensure(IAccessibilityService, () => new AccessibilityService(contextKeyService, configurationService));
        ensure(IListService, () => new ListService(themeService));
        let commandService = ensure(ICommandService, () => new StandaloneCommandService(this._instantiationService));
        let keybindingService = ensure(IKeybindingService, () => this._register(new StandaloneKeybindingService(contextKeyService, commandService, telemetryService, notificationService, logService, domElement)));
        let layoutService = ensure(ILayoutService, () => new SimpleLayoutService(StaticServices.codeEditorService.get(ICodeEditorService), domElement));
        ensure(IQuickInputService, () => new StandaloneQuickInputServiceImpl(_instantiationService, StaticServices.codeEditorService.get(ICodeEditorService)));
        let contextViewService = ensure(IContextViewService, () => this._register(new ContextViewService(layoutService)));
        ensure(IClipboardService, () => new BrowserClipboardService());
        ensure(IContextMenuService, () => {
            const contextMenuService = new ContextMenuService(telemetryService, notificationService, contextViewService, keybindingService, themeService);
            contextMenuService.configure({ blockMouse: false }); // we do not want that in the standalone editor
            return this._register(contextMenuService);
        });
        ensure(IMenuService, () => new MenuService(commandService));
        ensure(IBulkEditService, () => new SimpleBulkEditService(StaticServices.modelService.get(IModelService)));
    }
    get(serviceId) {
        let r = this._serviceCollection.get(serviceId);
        if (!r) {
            throw new Error('Missing service ' + serviceId);
        }
        return r;
    }
    set(serviceId, instance) {
        this._serviceCollection.set(serviceId, instance);
    }
    has(serviceId) {
        return this._serviceCollection.has(serviceId);
    }
}
