/*SearchFilterPipe on itse tehty filtteri, jolla filtteröidään
kategorioita perustuen syötettyyn filterValue -hakuarvoon. Hakuarvoa verrataan
filterByField -kentän (tässä 'name' tai 'email') arvoon. Palautetaan filtteröity data listassa.
Muista importata SearchFilterPipe päämoduuliin.
*/
import { Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'searchfilter'})
export class SearchFilterPipe implements PipeTransform {
// transform -metodi tulee PipeTransform -rajapinnasta
    transform(list: any[], filterByField: string, filterValue: string): any {
// jos ei ole annettu kenttää johon filtteröinti perustuu tai hakuarvoa
// niin palautetaan kaikki kontaktit listassa
        if (!filterByField || !filterValue) {
            return list;
        }
// jos on annettu kenttä ja hakuarvo niin palautetaan filtteröity lista
        return list.filter(item => {
            const field = item[filterByField].toLowerCase(); // item[filterByField] on kenttä
            const filter = filterValue.toLocaleLowerCase(); // filterValue on hakuarvo
            return field.indexOf(filter) >= 0; // palautetaan ne kentät joissa esiintyy hakuarvo
        });
    }
}
