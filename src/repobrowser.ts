
import {FolderInfo} from './folderinfo';
import * as fs from '@node/fs';
import * as path from '@node/path';
import {Disposable, observable} from 'aurelia-framework';

export class RepoBrowser
{
    public Folders : FolderInfo[] = [];
    private AllFolders : FolderInfo[] = [];
    private disposeSubscription : Disposable;
    private selectedIndex = 0;
    
    @observable
    public SearchTerm : string;
    
    public SelectedFolder : FolderInfo;
    
    constructor()
    {        
        window.addEventListener("keydown", event => this.HandleKeyBoardEvent(event));        
    }
    
    private HandleKeyBoardEvent(event : KeyboardEvent)
    {                        
        if (event.keyCode == 38)
        {
            if (this.selectedIndex > 0)
            {
                this.selectedIndex--;
                this.SelectedFolder = this.Folders[this.selectedIndex];
            }   
                      
        }     

        if (event.keyCode == 40 )
        {
            if (this.selectedIndex < this.Folders.length -1)
            {
                this.selectedIndex++;
                this.SelectedFolder = this.Folders[this.selectedIndex];
            }
        }   
    }


    private SearchTermChanged(newValue : string,oldValue : string)
    {
        this.Folders = this.AllFolders.filter(fn => fn.Name.startsWith(newValue));
        if (this.Folders.length == 0)
        {
            
        }        
    }

    


    activate()
    {
          this.PopulateFolderInfo();
    }

    deactivate()
    {
        this.disposeSubscription.dispose();
    }

    public PopulateFolderInfo() : void
    {
        let srcPath = "/Users/bernhardrichter/Projects";
        let folderNames : string[] = fs.readdirSync(srcPath);
        folderNames
            .filter(fn => fs.statSync(path.join(srcPath, fn)).isDirectory())
            .forEach(fn => this.AllFolders.push(new FolderInfo(fn)));
        this.Folders = this.AllFolders;                                    
    }
}