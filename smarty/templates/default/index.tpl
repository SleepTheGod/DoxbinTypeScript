<div class="col-md-12" style="margin-top: 10px;">
        <div class="col-md-12" style="margin-top: 100px;">
            <div align="center">
                <h1>Doxbin</h1>
                <p>Showing {$doxCount} dox(es)</p>
            </div>
        </div>

        <div class="col-md-6 col-md-offset-3">
            {if $doxCount > 0}
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th class="text-center">Views</th>
                        <th class="text-center">Date</th>
                        <th class="text-center">RAW</th>
                    </tr>
                </thead>
                <tbody>
                    {foreach from=$doxList item=dox}
                      <tr class="doxentry">
                        <td><a href="upload/{$dox.id}">{$dox.title|escape:"html"}</a></td>
                        <td class="text-center">{$dox.views}</td>
                        <td class="text-center">{$dox.date}</td>
                        <td class="text-center"><a href="upload/{$dox.id}/raw">RAW</a></td>
                      </tr>
                    {/foreach}
                </tbody>
            </table>
            {else}
            <div class="alert alert-info text-center">
                <p>No doxes yet. <a href="add/">Add the first one!</a></p>
            </div>
            {/if}
        </div>
    </div>
